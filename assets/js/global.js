'use strict';

import { setCookie } from "../helper/cookies.js";

const timeOutCookie = 4 * 60 * 60 * 1000

const addEventOnElements = function (elements, eventType, callBack) {
    for (const e of elements) {
        e.addEventListener(eventType, callBack)
    }
}

const handleToDetailPage = async () => {
    document.addEventListener("click", (event) => {
        const item = event.target.closest("[todetail]")
        if (item) {
            setCookie("movie-slug", item.getAttribute("movie-slug"), 1)
            // localStorage.setItem("movie-slug", item.getAttribute("movie-slug"))
        }

    })
}
const handleToWatchMoviePage = () => {
    document.addEventListener("click", (event) => {
        const item = event.target.closest("[watch-now-btn]")
        if (item) {
            setCookie("movie-slug", item.getAttribute("movie-slug"), 1)
            // localStorage.setItem("movie-slug", item.getAttribute("movie-slug"))
        }

    })
}

export { addEventOnElements, handleToDetailPage, handleToWatchMoviePage, timeOutCookie }
