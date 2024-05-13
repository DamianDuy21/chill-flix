import { getCookie, setCookie } from "../helper/cookies.js"
import fetchAPI, { API_DETAIL_MOVIE } from "./api.js"
import { handleSaveMovie, handleMovieInSaveList, handleUnSaveMovie } from "./global.js";


const bannerDetailPage = async () => {
    let email = getCookie("email")
    let password = getCookie("password")
    const segments = window.location.href.split("?")
    const movieSlug = segments[segments.length - 1]
    const alreadySaved = await handleMovieInSaveList(email, password, movieSlug)
    const api = API_DETAIL_MOVIE + movieSlug
    const result = await fetchAPI(api)
    let trailer_url = result.movie.trailer_url.replace("/watch?v=", "/embed/")

    const container = document.querySelector("[page-content]")

    //movie-detail
    const movieDetail = `
    <div class="movie-detail">
            <div class="backdrop-image" style="background-image: url(${result.poster_url})">
            </div>
            <div class="poster-box movie-poster">
                <img src=${result.movie.poster_url} alt=${result.movie.name} class="img-cover">
            </div>
            <div class="detail-box">
                <div class="detail-content">
                    <h1 class="heading">${result.movie.name}</h1>
                    <div style="display: flex; gap: 16px;">
                    <a href="./watchMovie.html?${result.episodes[0].server_data.length > 1 ? (`${result.movie.slug}&tap-01`) : (`${result.movie.slug}&full`)}" class="btn" watch-now-btn movie-slug=${result.movie.slug} movie-alike=${result.movie.category[0].slug} movie-name="${result.movie.name}">
                        <img src="./assets/images/play_circle.png" alt="" width="24" height="24">
                        <span class="span">Xem ngay</span>
                    </a>
                    ${(email && password) ? (`${(alreadySaved) ? (`<button class="btn normal" movie-slug=${result.movie.slug} unsave-movie-btn>
                    <span class="span">Bỏ lưu phim</span>
                </button>`)
            :
            (`<button class="btn normal"  movie-slug=${result.movie.slug} save-movie-btn>
                    <span class="span">Lưu phim</span>
                </button>`)}`) : (``)}
                    
                    
                    </div>
                    
                    <div class="meta-list">
                        
                        <div class="meta-item">${result.movie.year}</div>
                        <div class="separator"></div>
                        <div class="meta-item card-badge">${result.movie.quality}</div>
                    </div>
                    <div style="margin-top: 12px">
                        <div class="meta-item">Thời lượng: <span style="transform: translateY(1px);">${result.movie.time}</span></div>
                    </div>
                    ${result.movie.episode_current != "Full" ? (`
                    <div style="margin-top: 12px">
                    <div class="meta-item">Số tập hiện tại: <span style="transform: translateY(1px);">${result.episodes[0].server_data.length}</span></div>
                </div>
                    `) : (``)}
                    
                    <div class="category">
                        ${result.movie.category.map(cate => {
                return `${cate.name}`
            }).join(", ")}
                        </div>
                    <p class="overview">
                        ${result.movie.content}
                    </p>
                    <div class="detail-list">
                        <div class="list-item">
                            <p class="list-name">Actors</p>
                            <p>
                            ${result.movie.actor.map(actor => {
                return `${actor}`
            }).join(", ")}
                            </p>
                        </div>
                        <div class="list-item">
                            <p class="list-name">Directors</p>
                            <p>
                            ${result.movie.director.map(d => {
                return `${d}`
            }).join(", ")}
                            </p>
                        </div>
                    </div>

                </div>

                <div class="title-wrapper">
                    <h3 class="title-large">
                        Trailers
                    </h3>
                </div>

                <div class="slider-list">
                    <div class="slider-inner">
                        <div class="video-card">
                            <iframe width="100%" height="100%" src=${trailer_url}
                                frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `



    container.innerHTML += movieDetail
    await handleSaveMovie(email, password)
    await handleUnSaveMovie(email, password)
}

export default bannerDetailPage