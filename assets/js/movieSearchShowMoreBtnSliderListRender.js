import { getCookie } from "../helper/cookies.js"
import fetchAPI, { API_DETAIL_MOVIE, API_FEATUREFILM, API_SEARCH_CATEGORY, API_TELEVISIONSERIES } from "./api.js"
import { handleToDetailPage } from "./global.js"
let page = 1
let limit = 10
const movieSearchShowMoreBtnSliderListRender = async () => {

    const classify = getCookie("search-slug")
    // const classify = localStorage.getItem("search-slug")
    const fetchMovie = async () => {

        const loadMoreBtn = document.querySelector("[showMoreBtn-load-more-btn]");
        if (loadMoreBtn) {
            loadMoreBtn.classList.add("loading")
        }
        let api = ''
        if (classify == "phim-le") {
            api = API_FEATUREFILM
        }
        else if (classify == "phim-bo") {
            api = API_TELEVISIONSERIES
        }
        else if (classify == "phim-lien-quan") {
            // api = API_SEARCH_CATEGORY + localStorage.getItem("movie-alike")
            api = API_SEARCH_CATEGORY + getCookie("movie-alike")
        }
        api = api + `?limit=${limit}` + `&page=${page}`
        const respone = await fetchAPI(api)
        if (respone) {
            const result = await Promise.all(respone.data.items.map(async (item) => {
                let movie_api = API_DETAIL_MOVIE + item.slug;
                const data = await fetchAPI(movie_api);
                if (!data || !data.movie) {
                    return;
                }
                if (classify == "phim-lien-quan" && data.movie.name == getCookie("movie-name")) {
                    return;
                }
                return `
                    <div class="movie-card">
                        <div class="poster-box card-banner">
                            <img src=${data.movie.poster_url} alt=${data.movie.name} class="img-cover">
                        </div>
                        <h4 class="title">${data.movie.name}</h4>
                        <div class="meta-list">
                            <div class="card-badge">${data.movie.year}</div>
                        </div>
                        <a href="./detail.html" class="card-btn" 
                        title=${data.movie.name}
                        movie-slug=${data.movie.slug}
                        movie-alike=${data.movie.category[0].slug}
                        todetail
                        ></a>
                    </div>
                `;
            }));
            const filteredResult = result.filter(html => html !== undefined);
            const gridList = document.querySelector("[showMoreBtn-grid-list]")
            filteredResult.forEach(item => {
                gridList.innerHTML += item;
            });
        }
        if (loadMoreBtn) {
            loadMoreBtn.classList.remove("loading")
        }
    }

    const handleLoadMore = async () => {
        await page++
        await fetchMovie()

    }

    const container = document.querySelector("[page-content]")

    let movieName = classify == "phim-lien-quan" ? (`- ` + getCookie("movie-name")) : ('')
    console.log(movieName)

    const showMoreBtnSearchList = `
    <section class="searchShowMoreBtn-list" searchShowMoreBtn-list>
        <p class="label">Results for</p>
        <div class="title-wrapper">
        <h3 class="title-large">${getCookie("search-name")} ${movieName}</h3>

        </div>
        <div class="grid-list" showMoreBtn-grid-list>

        
        </div>

        <button class="btn load-more" showMoreBtn-load-more-btn>Load more</button>

    </section>
    `
    container.innerHTML += showMoreBtnSearchList
    await fetchMovie()
    await handleToDetailPage()
    const loadMoreBtn = document.querySelector("[showMoreBtn-load-more-btn]");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", handleLoadMore);
    }

}
export default movieSearchShowMoreBtnSliderListRender