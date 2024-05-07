import fetchAPI, { API_DETAIL_MOVIE, API_SEARCH_MOVIE } from "./api.js"
import { handleToDetailPage } from "./global.js"

let limit = 10
const movieSearchHeaderBoxRender = async () => {

    const fetchMovie = async (limit) => {
        const loadMoreBtn = document.querySelector("[header-box-load-more-btn]");
        if (loadMoreBtn) {
            loadMoreBtn.classList.add("loading")
        }
        let api = API_SEARCH_MOVIE + `?keyword=${localStorage.getItem("search-slug")}` + `&limit=${limit}`
        // console.log(api)
        const respone = await fetchAPI(api)
        if (respone.data.params.pagination.totalItems == 0) {
            const searchNotFound = document.querySelector("[search-not-found]")
            searchNotFound.setAttribute("style", "display: block")
        }
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
        gridList.innerHTML = ''
        filteredResult.forEach(item => {
            gridList.innerHTML += item
        })
        loadMoreBtn.classList.remove("loading")
        if (limit >= respone.data.params.pagination.totalItems) {
            loadMoreBtn.setAttribute("style", "display: none")
        }

    }

    const handleLoadMore = () => {
        limit += 10
        fetchMovie(limit)
    }

    const container = document.querySelector("[page-content]")

    const headerBoxSearchList = `
    <section class="searchHeaderBox-list" searchHeaderBox-list>
    <p class="label">Results for</p>
        <div class="title-wrapper">
            <h3 class="title-large">${localStorage.getItem("search-name")}</h3>
        </div>
    <div search-not-found style="display: none;">
        <h3 class="title-large"> Không có kết quả tìm kiếm...</h3>
    </div>  
    <div class="grid-list" headerbox-grid-list>

        
    </div>

    <button class="btn load-more" header-box-load-more-btn>Load more</button>

</section>
    `

    container.innerHTML += headerBoxSearchList
    await fetchMovie(limit)
    await handleToDetailPage()
    const loadMoreBtn = document.querySelector("[header-box-load-more-btn]");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", handleLoadMore);
    }

}
export default movieSearchHeaderBoxRender