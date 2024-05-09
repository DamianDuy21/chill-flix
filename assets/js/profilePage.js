import { getCookie, setCookie } from "../helper/cookies.js"
import { authenUser, editUser } from "./api.js"
import { handleUnAuthened } from "./global.js"
import headerBoxProfile from "./headerBoxProfile.js"


const handleSubmit = async (e) => {
    await e.preventDefault();
    let email = (e.target.elements.email.value)
    let password = (e.target.elements.password.value)
    let username = (e.target.elements.username.value)
    if (!email || !password || !username) {
        alert("Vui lòng nhập đầy đủ thông tin!")
    }
    else {
        let signInBtn = e.target.querySelector("[authen-btn]");
        signInBtn.classList.add("loading");
        try {
            const user = await authenUser(email, getCookie("password"));
            if (user.data.length > 0) {
                try {
                    const res = await editUser({
                        _id: user.data[0]._id,
                        username: username,
                        password: password
                    });
                    await setCookie("user-name", username, 1);
                    await setCookie("email", email, 1);
                    await setCookie("password", password, 1);
                    alert("Cập nhật thông tin thành công!")
                    window.location.href = "index.html"
                } catch (editError) {
                    console.error("Error editing user:", editError);
                    alert("Có lỗi xảy ra khi cập nhật thông tin người dùng. Vui lòng thử lại sau.");
                }
            } else {
                alert("Thông tin không chính xác!");
            }
        } catch (authError) {
            console.error("Error authenticating user:", authError);
            alert("Có lỗi xảy ra khi xác thực người dùng. Vui lòng thử lại sau.");
        }
        signInBtn.classList.remove("loading");
    }
};


const profileContent = async () => {
    let email = getCookie("email")
    let password = getCookie("password")
    let user = await authenUser(email, password)

    const container = await document.querySelector("[page-content]");
    container.innerHTML = `
    <div class="authen-container">
        <form class="authen-form" autocomplete=off>
            <div class="title">
                <h3 class="title-large">Hồ sơ</h3>
            </div>

            <div class="authen-inputs">
                <div class="input-wrapper">
                    <label for="">Email</label>
                    <input name="email" value="${user.data[0].email}" type="text" placeholder="Email..." class="input-field" disabled>
                </div>
                <div class="input-wrapper">
                    <label for="">Tên người dùng</label>
                    <input name="username" value="${user.data[0].username}" type="text" placeholder="Tên người dùng..." class="input-field">
                </div>
                <div class="input-wrapper">
                    <label for="">Mật khẩu</label>
                    <input name="password" value="${user.data[0].password}" type="text" placeholder="Mật khẩu..." class="input-field">
                </div>
            </div>

            <div class="authen-btns">
                <button class="authen-btn" type="submit" authen-btn>
                    <span>Cập nhật</span>
                </button>
            </div>
        </form>
    </div>
    `;

    const form = document.querySelector('.authen-form');
    form.addEventListener('submit', handleSubmit);
};

const profilePageRender = async () => {

    await handleUnAuthened()
    await headerBoxProfile()

    await profileContent()

}
profilePageRender()
