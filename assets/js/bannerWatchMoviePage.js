import { getCookie, setCookie } from "../helper/cookies.js"
import fetchAPI, { API_DETAIL_MOVIE, authenUser, editUser } from "./api.js"


let movieStatus = true

const bannerWatchMoviePage = async () => {
    const segments = window.location.href.split("?")
    const movieSlug = segments[segments.length - 1].split("&")[0]
    let episodeSlug = segments[segments.length - 1].split("&")[1]

    const api = API_DETAIL_MOVIE + movieSlug
    const result = await fetchAPI(api)
    const episode = result.episodes[0].server_data.find(item => {
        return item.slug == episodeSlug
    })
    console.log(episode)
    if (!episode) {
        movieStatus = false
    }

    // src= ${item.link_embed}
    const container = document.querySelector("[page-content]")
    container.classList.add("watch-movie-page")
    let video = ``
    if (movieStatus) {
        video = `
        <div class="video-wrapper">
                ${result.episodes[0].server_data.map((item) => {
            if (item.slug == episodeSlug) {
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
                <h1 class="heading ">${result.movie.name} ${episode == "full" ? ('') : (`- ${episode.name}`)} </h1>
            </div>

            <div class="episode-list">
            ${result.episodes[0].server_data.map((item, index) => {
            if (item.name == episode.name) {
                if (episode.name == "Full") {
                    return `
                    <button class="episode-btn btn full" episode-btn>
                    <a href="./watchMovie.html?${movieSlug}&full">
                            ${item.name}
                        </a>
                    </button>
                    `
                }
                return `
                    <button class="episode-btn btn active" episode-btn>
                    <a href="./watchMovie.html?${movieSlug}&${item.slug}">
                            ${item.name}
                        </a>
                    </button>
                    `
            }
            else {
                return `
                    <button class="episode-btn btn" episode-btn>
                    <a href="./watchMovie.html?${movieSlug}&${item.slug}">
                            ${item.name}
                        </a>
                    </button>
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
    let item = `${movieSlug}`
    if (user.data.length > 0) {
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

    }

    container.innerHTML += video
}

export default bannerWatchMoviePage