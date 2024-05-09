window.handleToSignInPage = (e) => {
    e.preventDefault();
    window.location.href = "signIn.html";
};

window.handleSubmit = (e) => {
    e.preventDefault();
    console.log(1);
};
const signUpPage = () => {
    const body = document.querySelector("body");
    body.innerHTML = `
    <img src="./assets/images/authen-page-background.jpg" alt="" class="img-cover authen-background">
    <div class="authen-container">
        <form class="authen-form" onsubmit="handleSubmit(event)">
            <div class="title">
                <h3 class="title-large">Đăng kí</h3>
            </div>

            <div class="authen-inputs">
                <div class="input-wrapper">
                    <label for="">Email</label>
                    <input name="email" type="text" placeholder="Email..." class="input-field">
                </div>
                <div class="input-wrapper">
                    <label for="">Tên người dùng</label>
                    <input name="username" type="password" placeholder="Tên người dùng..." class="input-field">
                </div>
                <div class="input-wrapper">
                    <label for="">Mật khẩu</label>
                    <input name="password" type="password" placeholder="Mật khẩu..." class="input-field">
                </div>
            </div>

            <div class="authen-btns">
                <button class="authen-btn" type="submit">Đăng kí</button>
                <div class="or"><span>hoặc</span></div>
                <div class="authen-btn normal" onclick="handleToSignInPage(event)">Bạn đã có tài khoản?</div>
            </div>
        </form>
    </div>
    `;
};

signUpPage();
