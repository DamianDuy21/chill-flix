
import { getCookie } from "../helper/cookies.js";
import { handleResize } from "./handleResize.js";
import headerBox from "./headerBox.js";
import movieSearchHeaderBoxRender from "./movieSearchHeaderBoxRender.js";
import movieSearchShowMoreBtnSliderListRender from "./movieSearchShowMoreBtnSliderListRender.js";
import movieSearchSidebarRender from "./movieSearchSidebarRender.js";

import { sidebar } from "./sidebar.js";


const movieSearchPagePageRender = async () => {

    await headerBox()
    await sidebar()
    await handleResize()

    const searchType = getCookie("search-type")
    if (!searchType) {
        window.location.href = "index.html";
    }
    // const searchType = localStorage.getItem("search-type")
    if (searchType == "header-box") {
        await movieSearchHeaderBoxRender()
    }
    if (searchType == "sidebar") {
        await movieSearchSidebarRender()
    }
    if (searchType == "show-more-btn") {
        await movieSearchShowMoreBtnSliderListRender()
    }

}
movieSearchPagePageRender()
