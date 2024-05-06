import fetchAPI, { API_DETAIL_MOVIE } from "./api.js"


const bannerDetailPage = async () => {
    const movieSlug = localStorage.getItem("movie-slug")
    const api = API_DETAIL_MOVIE + movieSlug
    const result = await fetchAPI(api)
    console.log(result)
    let trailer_url = result.movie.trailer_url.replace("/watch?v=", "/embed/")
    console.log(trailer_url)
    localStorage.setItem("episode", "")
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
                    <a href="./watchMovie.html" class="btn">
                        <img src="./assets/images/play_circle.png" alt="" width="24" height="24">
                        <span class="span">Watch now</span>
                    </a>
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

}

export default bannerDetailPage