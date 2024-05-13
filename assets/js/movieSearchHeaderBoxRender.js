import { getCookie } from "../helper/cookies.js"
import fetchAPI, { API_DETAIL_MOVIE, API_NEW_MOVIE, API_SEARCH_MOVIE } from "./api.js"


let limit = 10
let page = 1
const movieSearchHeaderBoxRender = async () => {
    const segments = window.location.href.split("?")
    const searchSlug = (segments[segments.length - 1].split("&")[1] == '') ? ("all-movie") : (segments[segments.length - 1].split("&")[1])
    const fetchMovie = async () => {
        const loadMoreBtn = document.querySelector("[header-box-load-more-btn]");
        if (loadMoreBtn) {
            loadMoreBtn.classList.add("loading")
        }

        let api = ''
        let result = []
        let respone = {}
        if (searchSlug == "all-movie") {
            api = API_NEW_MOVIE + `?page=${page}`
            respone = await fetchAPI(api)
            if (respone.status == false) {
                const searchNotFound = document.querySelector("[search-not-found]")
                searchNotFound.setAttribute("style", "display: block")
            }
            result = await Promise.all(respone.items.map(async (item) => {
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
                        <a href="./detail.html?${data.movie.slug}" class="card-btn" 
                        title=${data.movie.name}
                        movie-slug=${data.movie.slug}
                        movie-alike=${data.movie.category[0].slug}
                        todetail
                        ></a>
                    </div>
                `;
            }));

        }
        else {
            api = API_SEARCH_MOVIE + `?keyword=${searchSlug}` + `&limit=${limit}`
            respone = await fetchAPI(api)
            if (respone.data.params.pagination.totalItems == 0) {
                const searchNotFound = document.querySelector("[search-not-found]")
                searchNotFound.setAttribute("style", "display: block")
            }
            result = await Promise.all(respone.data.items.map(async (item) => {
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
                        <a href="./detail.html?${data.movie.slug}" class="card-btn" 
                        title=${data.movie.name}
                        movie-slug=${data.movie.slug}
                        movie-alike=${data.movie.category[0].slug}
                        todetail
                        ></a>
                    </div>
                `;
            }));
        }

        const filteredResult = result.filter(html => html !== undefined);
        const gridList = document.querySelector("[headerbox-grid-list]")
        if (searchSlug != 'all-movie') {
            gridList.innerHTML = ''
        }

        filteredResult.forEach(item => {
            gridList.innerHTML += item
        })
        loadMoreBtn.classList.remove("loading")
        if (searchSlug == "all-movie") {
            if (page >= respone.pagination.totalPages) {
                loadMoreBtn.setAttribute("style", "display: none")
            }
        }
        else {
            if (limit >= respone.data.params.pagination.totalItems) {
                loadMoreBtn.setAttribute("style", "display: none")
            }
        }

    }


    const handleLoadMoreLimit = async () => {
        limit += 10
        await fetchMovie()
    }
    const handleLoadMorePage = async () => {
        page += 1
        await fetchMovie()
    }

    const container = document.querySelector("[page-content]")

    const searchName = searchSlug == 'all-movie' ? ("Tất cả phim") : (searchSlug)
    const headerBoxSearchList = `
    <section class="searchHeaderBox-list" searchHeaderBox-list>
    <p class="label">Kết quả tìm kiếm</p>
        <div class="title-wrapper">
            <h3 class="title-large">${searchName}</h3>
        </div>
    <div search-not-found style="display: none;">
        <h3 class="title-large"> Không có kết quả tìm kiếm...</h3>
    </div>  
    <div class="grid-list" headerbox-grid-list>

        
    </div>

    <button class="btn load-more" header-box-load-more-btn>Tải thêm</button>

</section>
    `

    container.innerHTML += headerBoxSearchList
    await fetchMovie()
    const loadMoreBtn = document.querySelector("[header-box-load-more-btn]");
    if (loadMoreBtn) {
        if (searchSlug != '') {
            loadMoreBtn.addEventListener("click", handleLoadMoreLimit);
        }
        else {
            loadMoreBtn.addEventListener("click", handleLoadMorePage);
        }

    }
}

export default movieSearchHeaderBoxRender