
import { setCookie } from "../helper/cookies.js";
import fetchAPI, { API_CATEGORY } from "./api.js";
import { addEventOnElements } from "./global.js";

const sidebar = async () => {
    const genreList = []
    const resultGenre = await fetchAPI(API_CATEGORY)
    resultGenre.forEach(item => {
        genreList.push(item)
    })


    const createList = (sidebarInner, data, listName) => {
        const list = `
            <div class="sidebar-list">
            <p class="title">${listName}</p>
            ${data.map(item => {
            return `<a class="sidebar-link" href="./movieSearch.html?2&${item.slug}" sidebar-link menu-close search-slug=${item.slug}>${item.name}</a>`
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

        })
    }
    const sidebarr = document.querySelector("[sidebar]")
    sidebarr.appendChild(sidebarInner)
    toggleSidebar(sidebarr)


}

export { sidebar }