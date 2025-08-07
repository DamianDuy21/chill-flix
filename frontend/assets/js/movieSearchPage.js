
import { handleResize } from "./handleResize.js";
import headerBox from "./headerBox.js";
import movieSearchHeaderBoxRender from "./movieSearchHeaderBoxRender.js";
import movieSearchShowMoreBtnSliderListRender from "./movieSearchShowMoreBtnSliderListRender.js";
import movieSearchSidebarRender from "./movieSearchSidebarRender.js";

import { sidebar } from "./sidebar.js";


const movieSearchPagePageRender = async () => {
    const segments = window.location.href.split("?")
    const searchType = segments[segments.length - 1].split("&")[0]
    await headerBox()
    await sidebar()
    await handleResize()


    if (searchType == "1") {
        await movieSearchHeaderBoxRender()
    }
    if (searchType == "2") {
        await movieSearchSidebarRender()
    }
    if (searchType == "3") {
        await movieSearchShowMoreBtnSliderListRender()
    }

}
movieSearchPagePageRender()
