import { deleteAllCookies, getCookie, setCookie } from "../helper/cookies.js";
import { addEventOnElements } from "./global.js";

const headerBox = async () => {
    const header = document.querySelector("header")
    const userName = getCookie("user-name")
    const handleSearchBox = () => {
        const searchBox = document.querySelector("[search-box]");
        const searchTogglers = document.querySelectorAll("[search-toggler]")

        addEventOnElements(searchTogglers, "click", function () {
            searchBox.classList.toggle("active")
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const searchKey = (e.target[0].value)
        setCookie("search-slug", searchKey, 1)
        setCookie("search-name", searchKey, 1)
        setCookie("search-type", "header-box", 1)
        // localStorage.setItem("search-slug", searchKey)
        // localStorage.setItem("search-name", searchKey)
        // localStorage.setItem("search-type", "header-box")
        window.location.href = './movieSearch.html';
    }

    const handleDisplayOptions = async () => {
        userBtn.classList.toggle("active")
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
<div class="search-box" search-box>
    <form class="search-wrapper" onsubmit="return false;">
        <input type="text" name="search" placeholder="Tìm kiếm phim..." class="search-field" search-field
            autocomplete="off">
        <img src="./assets/images/search.png" width="24" height="24" alt="search" class="leading-icon">

    </form>

    <button class="search-btn" search-toggler>
        <img src="./assets/images/close.png" width="24" height="24" alt="close search box">
    </button>
</div>

<button class="search-btn" search-toggler>
    <img src="./assets/images/search.png" alt="open search box" width="24" height="24">
</button>

<button class="menu-btn" menu-btn menu-toggler>
    <img src="./assets/images/menu.png" width="24" height="24" alt="open menu" class="menu">
    <img src="./assets/images/menu-close.png" width="24" height="24" alt="close menu" class="close">
</button>

<button class="user-btn" user-btn>
    <div class="user-name">
        <span>${userName}</span>
    </div>
    <img src="./assets/images/setting-icon.png" width="24" height="24" alt="user-btn">
    <div class="user-options">
        <div class="user-option">Hồ sơ</div>
        <div class="user-option">Phim đã lưu</div>
        <div class="user-option" sign-out-btn>Đăng xuất</div>
    </div>
</button>


`


    header.innerHTML += searchWrapper
    await handleSearchBox()
    const form = document.querySelector(".search-wrapper");
    form.addEventListener("submit", handleSubmit);
    const signOutBtn = document.querySelector("[sign-out-btn]");
    signOutBtn.addEventListener("click", handleSignOut);
    const userBtn = document.querySelector("[user-btn]");
    userBtn.addEventListener("click", handleDisplayOptions);


}
export default headerBox