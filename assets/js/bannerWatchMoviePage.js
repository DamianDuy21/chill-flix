import { getCookie, setCookie } from "../helper/cookies.js"
import fetchAPI, { API_DETAIL_MOVIE, authenUser, editUser } from "./api.js"

{/* <iframe src=${result.episodes[0].server_data[0].link_embed} */ }
// frameborder="0" class="video" allow="fullscreen"></iframe>

let movieStatus = true
const handleEpisode = () => {
    document.addEventListener("click", (event) => {
        const episode = event.target.closest("[episode-btn]")
        if (episode) {
            document.querySelectorAll("[episode-btn]").forEach(item => {
                item.classList.remove("active");
            });
            episode.classList.add("active")
            setCookie("episode", episode.innerHTML, 1)
            // localStorage.setItem("episode", episode.innerHTML)
            window.location.reload()
        }

    })
}
const bannerWatchMoviePage = async () => {

    // const movieSlug = localStorage.getItem("movie-slug")
    const movieSlug = getCookie("movie-slug")
    const api = API_DETAIL_MOVIE + movieSlug
    const result = await fetchAPI(api)
    let episode = ""
    if (getCookie("episode")) {
        episode = getCookie("episode")
    }
    else {
        if (result.episodes[0].server_data[0]) {
            episode = result.episodes[0].server_data[0].name
            setCookie("episode", episode, 1)
            // localStorage.setItem("episode", episode)
        }
        else {
            movieStatus = false
        }
    }
    // src= ${item.link_embed}
    const container = document.querySelector("[page-content]")
    container.classList.add("watch-movie-page")
    let video = ``
    if (movieStatus) {
        video = `
        <div class="video-wrapper">
                ${result.episodes[0].server_data.map((item) => {
            if (item.name == getCookie("episode")) {
                return `
                    <iframe src= ${item.link_embed}
                        frameborder="0" class="video" allow="fullscreen"></iframe>
                        `
            }
        }).join("")}
                
        </div>
        <div class="movie-detail ">
        <div class="detail-box">
            <div class="detail-content">
                <h1 class="heading ">${result.movie.name} ${episode == "Full" ? ('') : (`- ${episode}`)} </h1>
            </div>

            <div class="episode-list">
            ${result.episodes[0].server_data.map((item, index) => {
            if (item.name == episode) {
                if (episode == "Full") {
                    return `
                    <button class="episode-btn btn full" episode-btn>${item.name}</button>
                    `
                }
                return `
                    <button class="episode-btn btn active" episode-btn>${item.name}</button>
                    `
            }
            else {
                return `
                    <button class="episode-btn btn" episode-btn>${item.name}</button>
                    `
            }

        }).join("")}
                
            </div>
        </div>
    </div>
    `
    }
    else {
        video = `
            <div style="padding: 36px 0 64px 0">
                <h3 class="title-large">Phim đang được cập nhật...</h3>
            </div>
        `
    }

    let user = await authenUser(getCookie("email"), getCookie("password"))
    console.log(user)
    let item = `${getCookie("movie-slug")}`
    if (user.data[0].movie.history.includes(item)) {
        let historyList = user.data[0].movie.history.filter(i => {
            return i != item
        })
        user.data[0].movie.history = historyList
        user.data[0].movie.history.unshift(item)
    }
    else {
        user.data[0].movie.history.unshift(item)
    }

    await editUser({
        _id: user.data[0]._id,
        movie: user.data[0].movie
    })

    container.innerHTML += video
    await handleEpisode()
}

export default bannerWatchMoviePage