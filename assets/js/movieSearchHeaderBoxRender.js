import fetchAPI, { API_DETAIL_MOVIE, API_SEARCH_MOVIE } from "./api.js"
import { handleToDetailPage } from "./global.js"

let limit = 0
let totalPage = 1
let currentPage = 1
const movieSearchHeaderBoxRender = async () => {

    const searchType = localStorage.getItem("search-type")
    const fetchMovie = async (limit) => {
        let api = API_SEARCH_MOVIE + `?keyword=${localStorage.getItem("search-slug")}` + `&limit=${limit}`
        const respone = await fetchAPI(api)
        totalPage = await respone.data.params.pagination.totalPages
        const result = await Promise.all(respone.data.items.map(async (item) => {
            let movie_api = API_DETAIL_MOVIE + item.slug;
            const data = await fetchAPI(movie_api);
            if (!data || !data.movie) {
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
                    todetail
                    ></a>
                </div>
            `;
        }));
        const filteredResult = result.filter(html => html !== undefined);
        const gridList = document.querySelector("[headerbox-grid-list]")
        filteredResult.forEach(item => {
            gridList.innerHTML += item
        })

    }

    const handleLoadMore = () => {
        fetchMovie(12)
    }
    const handleShowUp = () => {
        const searchHeaderBoxList = document.querySelector("[searchHeaderBox-list]")
        if (searchType == "header-box") {
            searchHeaderBoxList.classList.add("active")
        }
        else {
            searchHeaderBoxList.classList.remove("active")
        }
    }

    const container = document.querySelector("[page-content]")

    const headerBoxSearchList = `
    <section class="searchHeaderBox-list" searchHeaderBox-list>
    <p class="label">Results for</p>
        <div class="title-wrapper">
            <h3 class="title-large">${localStorage.getItem("search-name")}</h3>
        </div>
    <div class="grid-list" headerbox-grid-list>

        
    </div>

    <button class="btn load-more" header-box-load-more-btn>Load more</button>

</section>
    `

    container.innerHTML += headerBoxSearchList
    await handleShowUp()
    await handleLoadMore()
    await handleToDetailPage()
    const loadMoreBtn = document.querySelector("[header-box-load-more-btn]");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", handleLoadMore);
    }
    if (currentPage >= totalPage) {
        loadMoreBtn.setAttribute("style", "visibility: hidden; margin: 0px !important")
    }
    else {
        loadMoreBtn.setAttribute("style", "visibility: visible;")
    }

}
export default movieSearchHeaderBoxRender