import { getCookie } from "../helper/cookies.js";
import fetchAPI, { API_DETAIL_MOVIE, API_SEARCH_CATEGORY } from "./api.js";

let page = 1;
let click = 1;
let maxClick = 0
const movieSearchSidebarRender = async () => {
    const segments = window.location.href.split("?")
    const searchSlug = segments[segments.length - 1].split("&")[1]
    const fetchMovie = async () => {
        const loadMoreBtn = document.querySelector("[sidebar-load-more-btn]");

        if (loadMoreBtn) {
            loadMoreBtn.classList.add("loading")
        }

        const api = API_SEARCH_CATEGORY + searchSlug + `?page=${page}`;
        const respone = await fetchAPI(api);
        maxClick = respone.data.params.pagination.totalPages
        if (loadMoreBtn) {
            if (click >= maxClick - 1) {
                loadMoreBtn.setAttribute("style", "display: none")
            }
        }
        const result = await Promise.all(respone.data.items.map(async (item) => {
            const movie_api = API_DETAIL_MOVIE + item.slug;
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
        const filteredResult = result.filter(html => html !== undefined);
        const gridList = document.querySelector("[sidebar-grid-list]");
        filteredResult.forEach(item => {
            gridList.innerHTML += item;
        });
        loadMoreBtn.classList.remove("loading")
    };

    const handleLoadMore = async () => {
        await fetchMovie(++page);
        click++;
    };


    const container = document.querySelector("[page-content]");

    const sidebarSearchList = `
    <section class="searchSidebar-list" searchSidebar-list>
        <p class="label">Kết quả tìm kiếm</p>
        <div class="title-wrapper">
            <h3 class="title-large">${searchSlug}</h3>
        </div>
        <div class="grid-list" sidebar-grid-list>

        </div>
        <button class="btn load-more" sidebar-load-more-btn>Tải thêm</button>
    </section>
    `;
    // 


    container.innerHTML += sidebarSearchList;
    await fetchMovie(); // Fetch initial data

    const loadMoreBtn = container.querySelector("[sidebar-load-more-btn]");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", handleLoadMore);
    }


};

export default movieSearchSidebarRender;
