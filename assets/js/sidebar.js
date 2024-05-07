
import { setCookie } from "../helper/cookies.js";
import fetchAPI, { API_CATEGORY } from "./api.js";
import { addEventOnElements } from "./global.js";

const sidebar = async () => {
    const genreList = []
    const resultGenre = await fetchAPI(API_CATEGORY)
    resultGenre.forEach(item => {
        genreList.push(item)
    })

    const movieSearch = () => {
        document.addEventListener("click", (event) => {
            const cate = event.target.closest("[sidebar-link]")
            if (cate) {
                setCookie("search-name", cate.innerHTML, 1)
                setCookie("search-slug", cate.getAttribute("search-slug"), 1)
                // localStorage.setItem("search-name", cate.innerHTML)
                // localStorage.setItem("search-slug", cate.getAttribute("search-slug"))
            }

        })

    }

    const createList = (sidebarInner, data, listName) => {
        const list = `
            <div class="sidebar-list">
            <p class="title">${listName}</p>
            ${data.map(item => {
            return `<a class="sidebar-link" href="./movieSearch.html" sidebar-link menu-close search-slug=${item.slug}>${item.name}</a>`
        }).join("")}
            </div>`

        sidebarInner.innerHTML += list
        sidebarInner.innerHTML += `<div></div>`
    }

    const sidebarInner = document.createElement("div");
    sidebarInner.classList.add("sidebar-inner")
    sidebarInner.innerHTML = ``

    createList(sidebarInner, genreList, "Thể loại")
    const toggleSidebar = (sidebar) => {
        const siderbarBtn = document.querySelector("[menu-btn]")
        const sidebarTogglers = document.querySelectorAll("[menu-toggler]")
        const sidebarClose = document.querySelectorAll("[menu-close]")
        const overlay = document.querySelector("[overlay]")

        addEventOnElements(sidebarTogglers, "click", () => {
            sidebar.classList.toggle("active")
            siderbarBtn.classList.toggle("active")
            overlay.classList.toggle("active")
        })
        addEventOnElements(sidebarClose, "click", () => {
            sidebar.classList.toggle("active")
            siderbarBtn.classList.toggle("active")
            overlay.classList.toggle("active")
            setCookie("search-type", "sidebar", 1)
            // localStorage.setItem("search-type", "sidebar")
        })
    }
    const sidebarr = document.querySelector("[sidebar]")
    sidebarr.appendChild(sidebarInner)
    toggleSidebar(sidebarr)

    await movieSearch()

}

export { sidebar }