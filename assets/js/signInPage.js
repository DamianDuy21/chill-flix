import { getCookie, setCookie } from "../helper/cookies.js";
import { authenUser, editUser } from "./api.js";
import { handleAuthened } from "./global.js";

const handleToSignUpPage = (e) => {
    e.preventDefault();
    window.location.href = "signUp.html";
};

const handleSubmit = async (e) => {
    e.preventDefault();
    let email = (e.target.elements.email.value)
    let password = (e.target.elements.password.value)
    if (!email || !password) {
        alert("Vui lòng nhập đầy đủ thông tin!")
    }
    else {
        let signInBtn = e.target.querySelector("[authen-btn]");
        signInBtn.classList.add("loading");
        try {
            const user = await authenUser(email, password);
            console.log("User data:", user);
            if (user.data.length > 0) {
                try {
                    const res = await editUser({
                        _id: user.data[0]._id,
                        lastAccess: Date.now()
                    });
                    await setCookie("user-name", user.data[0].username, 1);
                    await setCookie("email", user.data[0].email, 1);
                    await setCookie("password", user.data[0].password, 1);
                    window.location.href = "index.html";
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


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('[authen-form]');
    form.addEventListener('submit', handleSubmit);

    const toSignUpBtn = document.querySelector("[to-sign-up-btn]")
    toSignUpBtn.addEventListener("click", handleToSignUpPage)
});

const signInPage = async () => {
    await handleAuthened()

    const body = document.querySelector("body");
    body.innerHTML = `
        <img src="./assets/images/authen-page-background.jpg" alt="" class="img-cover authen-background">
        <div class="authen-container">
    
            <form class="authen-form" authen-form autocomplete="off">
                <div class="title">
                    <h3 class="title-large">Đăng nhập</h3>
                </div>
    
                <div class="authen-inputs">
                    <div class="input-wrapper">
                        <label for="">Email</label>
                        <input name="email" type="text" placeholder="Email..." class="input-field">
                    </div>
                    <div class="input-wrapper">
                        <label for="">Mật khẩu</label>
                        <input name="password" type="password" placeholder="Mật khẩu..." class="input-field">
                    </div>
                </div>
    
                <div class="authen-btns">
                    <button class="authen-btn" authen-btn type="submit">
                        <span>Đăng nhập</span>
                    </button>
                    <div class="or"><span>hoặc</span></div>
                    <button class="authen-btn normal" to-sign-up-btn>Bạn chưa có tài khoản?</button>
                </div>
    
            </form>
    
    
        </div>
    
        `;

};

signInPage();


// 1715247587489