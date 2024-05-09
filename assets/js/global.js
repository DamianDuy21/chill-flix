'use strict';

import { getCookie, setCookie } from "../helper/cookies.js";
import fetchAPI, { API_CATEGORY, API_DETAIL_MOVIE, API_SEARCH_CATEGORY, authenUser } from "./api.js";

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
            setCookie("movie-alike", item.getAttribute("movie-alike"), 1)
            setCookie("movie-name", item.getAttribute("movie-name"), 1)
            // localStorage.setItem("movie-slug", item.getAttribute("movie-slug"))
        }

    })
}
const handleToWatchMoviePage = () => {
    document.addEventListener("click", (event) => {
        const item = event.target.closest("[watch-now-btn]")
        if (item) {
            setCookie("movie-slug", item.getAttribute("movie-slug"), 1)
            setCookie("movie-alike", item.getAttribute("movie-alike"), 1)
            setCookie("movie-name", item.getAttribute("movie-name"), 1)
            setCookie("episode", '')
            // localStorage.setItem("movie-slug", item.getAttribute("movie-slug"))
        }

    })
}
const handleCategoryAlikeMoviesList = async (movieAlike, movieSlug) => {
    const dataCategory = await fetchAPI(API_CATEGORY)
    const categoryList = dataCategory.map(item => {
        return item.slug
    })
    console.log(categoryList.includes(movieAlike))
    if (!categoryList.includes(movieAlike)) {
        const target = ''
        const api = API_DETAIL_MOVIE + movieSlug;
        const data = await fetchAPI(api);
        const movieCategory = data.movie.category.map(item => {
            return item.slug
        })
        for (let i = 0; i < movieCategory.length; i++) {
            if (categoryList.includes(movieCategory[i])) {
                return movieCategory[i]
            }
        }
        return target
    }
    else {
        return movieAlike
    }
}

const handleUnAuthened = async () => {
    let email = getCookie("email")
    let password = getCookie("password")
    const user = await authenUser(email, password);
    if (user.data.length == 0) {
        window.location.href = "signIn.html";
    } else {
    }
}
const handleAuthened = async () => {
    let email = getCookie("email")
    let password = getCookie("password")
    const user = await authenUser(email, password);
    if (user.data.length > 0) {
        window.location.href = "index.html";
    } else {
    }
}

export {
    addEventOnElements,
    handleToDetailPage,
    handleToWatchMoviePage,
    timeOutCookie,
    handleCategoryAlikeMoviesList,
    handleAuthened,
    handleUnAuthened
}
