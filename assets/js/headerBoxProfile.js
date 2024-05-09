import { deleteAllCookies, getCookie, setCookie } from "../helper/cookies.js";
import { addEventOnElements } from "./global.js";

const headerBoxProfile = async () => {
    const header = document.querySelector("header")
    const userName = getCookie("user-name")

    const handleDisplayOptions = async () => {
        await userBtn.classList.toggle("active")
    }

    const handleSignOut = async () => {
        await deleteAllCookies()
        window.location.href = "signIn.html"
    }

    const searchWrapper = `
    <a href="./index.html" class="logo">
    <!-- <img src="./assets/images/logo.svg" width="140" height="32" alt="Logo"> -->
    <div style="font-size: 32px; font-weight: 600">Logo</div>
</a>

<button class="user-btn" user-btn>
    <div class="user-name">
        <span>${userName}</span>
    </div>
    <img src="./assets/images/setting-icon.png" width="24" height="24" alt="user-btn">
    <div class="user-options">
        <div class="user-option" index-page-btn>Trang chủ</div>
        <div class="user-option" profile-page-btn>Hồ sơ</div>
        <div class="user-option" saved-movie-page-btn>Phim đã lưu</div>
        <div class="user-option" sign-out-btn>Đăng xuất</div>
    </div>
</button>


`


    header.innerHTML += searchWrapper

    const signOutBtn = document.querySelector("[sign-out-btn]");
    signOutBtn.addEventListener("click", handleSignOut);

    const indexPageBtn = document.querySelector("[index-page-btn]");
    indexPageBtn.addEventListener("click", () => {
        window.location.href = "index.html"
    });
    const profilePageBtn = document.querySelector("[profile-page-btn]");
    profilePageBtn.addEventListener("click", () => {
        window.location.href = "profile.html"
    });
    const savedMoviePageBtn = document.querySelector("[saved-movie-page-btn]");
    savedMoviePageBtn.addEventListener("click", () => {
        window.location.href = "savedMovie.html"
    });

    const userBtn = document.querySelector("[user-btn]");
    userBtn.addEventListener("click", handleDisplayOptions);


}
export default headerBoxProfile