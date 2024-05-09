import { getUser } from "./api.js";

window.handleToSignUpPage = (e) => {
    e.preventDefault();
    window.location.href = "signUp.html";
};

window.handleSubmit = async (e) => {
    e.preventDefault();
    let email = (e.target.elements.email.value)
    let password = (e.target.elements.password.value)
    const user = await getUser(email, password)
    if (user.data.length > 0) {
        window.location.href = "index.html"
    }
    else {

    }
};
const signInPage = () => {
    const body = document.querySelector("body");
    body.innerHTML = `
    <img src="./assets/images/authen-page-background.jpg" alt="" class="img-cover authen-background">
    <div class="authen-container">

        <form class="authen-form" onsubmit="handleSubmit(event)">
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
                <button class="authen-btn">Đăng nhập</button>
                <div class="or"><span>hoặc</span></div>
                <button class="authen-btn normal" onclick="handleToSignUpPage(event)">Bạn chưa có tài khoản?</button>
            </div>

        </form>


    </div>

    `;
};

signInPage();
