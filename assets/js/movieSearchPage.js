
import headerBox from "./headerBox.js";
import movieSearchHeaderBoxRender from "./movieSearchHeaderBoxRender.js";
import movieSearchShowMoreBtnSliderListRender from "./movieSearchShowMoreBtnSliderListRender.js";
import movieSearchSidebarRender from "./movieSearchSidebarRender.js";

import { sidebar } from "./sidebar.js";


const movieSearchPagePageRender = async () => {
    await headerBox()
    await sidebar()

    await movieSearchHeaderBoxRender()
    await movieSearchSidebarRender()
    await movieSearchShowMoreBtnSliderListRender()
}
movieSearchPagePageRender()
