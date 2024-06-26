import { setCookie } from "../helper/cookies.js";
import { addUser, authenUser } from "./api.js";

const handleToSignInPage = (e) => {
    e.preventDefault();
    window.location.href = "signIn.html";
};

const handleSubmit = async (e) => {
    e.preventDefault();
    let email = (e.target.elements.email.value).trim().toLowerCase()
    let password = (e.target.elements.password.value).trim()
    let username = (e.target.elements.username.value).trim()
    if (!email || !password || !username) {
        alert("Vui lòng nhập đầy đủ thông tin!")
    }
    else if (email.indexOf('#') !== -1) {
        alert("Email không được chứa kí tự '#'")
    }

    else {
        let signInBtn = e.target.querySelector("[authen-btn]");
        signInBtn.classList.add("loading");
        const user = await authenUser(email, password);
        if (user.data.length > 0) {

            alert("Email này đã được đăng kí!")
        } else {
            let user = {
                email: email,
                password: password,
                username: username,
                lastAccess: Date.now(),
            }
            const response = await addUser(user)
            if (!response.data) {
                alert("Đã có lỗi xảy ra...")
            }
            else {
                await setCookie("email", email, 1);
                alert("Tài khoản được đăng kí thành công!")
                window.location.href = "signIn.html"
            }
        }
        signInBtn.classList.remove("loading");
    }
};

const signUpPage = () => {
    const body = document.querySelector("body");
    body.innerHTML = `
    <img src="./assets/images/authen-page-background.jpg" alt="" class="img-cover authen-background">
    <div class="authen-container">
        <form class="authen-form" authen-form autocomplete=off>
            <div class="title">
                <h3 class="title-large">Đăng kí</h3>
            </div>

            <div class="authen-inputs">
                <div class="input-wrapper">
                    <label for="">Email</label>
                    <input name="email" type="email" placeholder="Email..." class="input-field">
                </div>
                <div class="input-wrapper">
                    <label for="">Tên người dùng</label>
                    <input name="username" type="text" placeholder="Tên người dùng..." class="input-field">
                </div>
                <div class="input-wrapper">
                    <label for="">Mật khẩu</label>
                    <input name="password" type="password" placeholder="Mật khẩu..." class="input-field">
                </div>
            </div>

            <div class="authen-btns">
                <button class="authen-btn" type="submit" authen-btn>
                    <span>Đăng kí</span>
                </button>
                <div class="or"><span>hoặc</span></div>
                <div class="authen-btn normal" to-sign-in-btn>Bạn đã có tài khoản?</div>
            </div>
        </form>
    </div>
    `;

    const form = document.querySelector('[authen-form]');
    form.addEventListener('submit', handleSubmit);

    const toSignUpBtn = document.querySelector("[to-sign-in-btn]")
    toSignUpBtn.addEventListener("click", handleToSignInPage)
};

signUpPage();
