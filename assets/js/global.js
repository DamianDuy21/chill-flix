'use strict';

import { getCookie, setCookie } from "../helper/cookies.js";
import fetchAPI, { API_CATEGORY, API_DETAIL_MOVIE, API_SEARCH_CATEGORY, authenUser, editUser } from "./api.js";

const timeOutCookie = 4 * 60 * 60 * 1000

const addEventOnElements = function (elements, eventType, callBack) {
    for (const e of elements) {
        e.addEventListener(eventType, callBack)
    }
}

const handleCategoryAlikeMoviesList = async (movieSlug) => {
    const dataCategory = await fetchAPI(API_CATEGORY)
    const categoryList = dataCategory.map(item => {
        return item.slug
    })
    const api = API_DETAIL_MOVIE + movieSlug
    const data = await fetchAPI(api)
    console.log(data)
    let target = movieSlug
    if (data.movie) {
        const movieCategory = data.movie.category.map(item => {
            return item.slug
        })
        for (let i = 0; i < movieCategory.length; i++) {
            if (categoryList.includes(movieCategory[i])) {
                target = movieCategory[i]
                break
            }
        }
    }

    return target
}

const handleUnAuthened = async () => {
    let email = getCookie("email")
    let password = getCookie("password")
    const user = await authenUser(email, password);
    if (user.data.length == 0) {
        window.location.href = "index.html";
    } else {
    }
}
//cho nay la tai vi dinh bat phai dang nhap moi duoc vao index nhung sau do thi khong can
//nen no hoi do hoi ti
const handleAuthened = async () => {
    let email = getCookie("email")
    let password = getCookie("password")
    const user = await authenUser(email, password);
    if (user.data.length > 0) {
        window.location.href = "index.html";
    } else {
    }
}

const handleSaveMovie = async (email, password) => {
    document.addEventListener("click", async (event) => {
        const item = event.target.closest("[save-movie-btn]")
        if (item) {
            let movieSlug = (item.getAttribute("movie-slug"))
            let respone = await authenUser(email, password)
            let user = respone.data[0]
            console.log(user)
            if (!user.movie.watchLater.includes(movieSlug)) {
                await user.movie.watchLater.unshift(movieSlug)
                let respone = await editUser({
                    _id: user._id,
                    movie: user.movie
                })
                if (respone) {
                    alert("Lưu phim thành công!")
                    window.location.reload()
                }
            }
            else {
                alert("Phim đã được lưu trước đó.")
            }
        }
    })
}
const handleUnSaveMovie = async (email, password) => {
    document.addEventListener("click", async (event) => {
        const item = event.target.closest("[unsave-movie-btn]")
        if (item) {
            let movieSlug = (item.getAttribute("movie-slug"))
            let respone = await authenUser(email, password)
            let user = respone.data[0]
            console.log(user)
            if (user.movie.watchLater.includes(movieSlug)) {
                user.movie.watchLater = user.movie.watchLater.filter(item => {
                    return item != movieSlug
                })
                let respone = await editUser({
                    _id: user._id,
                    movie: user.movie
                })
                if (respone) {
                    alert("Bỏ lưu phim thành công!")
                    window.location.reload()
                }
            }
            else {
                alert("Phim chưa được lưu.")
            }
        }
    })
}
const handleMovieInSaveList = async (email, password, slug) => {
    if (email && password && slug) {
        let respone = await authenUser(email, password)
        let user = await respone.data[0]
        return user.movie.watchLater.includes(slug)
    }

}


export {
    addEventOnElements,
    timeOutCookie,
    handleCategoryAlikeMoviesList,
    handleAuthened,
    handleUnAuthened,
    handleSaveMovie,
    handleUnSaveMovie,
    handleMovieInSaveList
}
