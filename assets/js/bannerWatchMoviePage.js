import fetchAPI, { API_DETAIL_MOVIE } from "./api.js"

{/* <iframe src=${result.episodes[0].server_data[0].link_embed} */ }
// frameborder="0" class="video" allow="fullscreen"></iframe>


const handleEpisode = () => {
    document.addEventListener("click", (event) => {
        const episode = event.target.closest("[episode-btn]")
        document.querySelectorAll("[episode-btn]").forEach(item => {
            item.classList.remove("active");
        });
        episode.classList.add("active")
        localStorage.setItem("episode", episode.innerHTML)
        window.location.reload()
    })
}
const bannerWatchMoviePage = async () => {

    const movieSlug = localStorage.getItem("movie-slug")
    const api = API_DETAIL_MOVIE + movieSlug
    const result = await fetchAPI(api)
    console.log(result)
    console.log(api)
    let episode = ""
    if (localStorage.getItem("episode")) {
        episode = localStorage.getItem("episode")
    }
    else {
        episode = result.episodes[0].server_data[0].name
        localStorage.setItem("episode", episode)
    }

    const container = document.querySelector("[page-content]")
    container.classList.add("watch-movie-page")

    const video = `
        <div class="video-wrapper">
                ${result.episodes[0].server_data.map((item) => {
        if (item.name == localStorage.getItem("episode")) {
            return `
                    <iframe src=${item.link_embed} 
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

    container.innerHTML += video
    await handleEpisode()
}

export default bannerWatchMoviePage