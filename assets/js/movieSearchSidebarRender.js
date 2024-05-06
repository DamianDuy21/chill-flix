import fetchAPI, { API_DETAIL_MOVIE, API_SEARCH_CATEGORY } from "./api.js";
import { handleToDetailPage } from "./global.js";

let page = 1;

const movieSearchSidebarRender = async () => {

    const fetchMovie = async () => {
        const loadMoreBtn = document.querySelector("[sidebar-load-more-btn]");
        if (loadMoreBtn) {
            loadMoreBtn.classList.add("loading")
        }
        const api = API_SEARCH_CATEGORY + localStorage.getItem("search-slug") + `?page=${page}`;
        const respone = await fetchAPI(api);
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
                    <a href="./detail.html" class="card-btn" 
                    title=${data.movie.name}
                    movie-slug=${data.movie.slug}
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
        await fetchMovie(page);
        page++;
    };


    const container = document.querySelector("[page-content]");

    const sidebarSearchList = `
    <section class="searchSidebar-list" searchSidebar-list>
        <p class="label">Results for</p>
        <div class="title-wrapper">
            <h3 class="title-large">${localStorage.getItem("search-name")}</h3>
        </div>
        <div class="grid-list" sidebar-grid-list>

        </div>
        <button class="btn load-more" sidebar-load-more-btn>Load more</button>
    </section>
    `;
    // 


    container.innerHTML += sidebarSearchList;
    await fetchMovie(); // Fetch initial data
    await handleToDetailPage();

    // const loadMoreBtn = container.querySelector("[sidebar-load-more-btn]");
    // console.log(loadMoreBtn)
    // if (loadMoreBtn) {
    //     loadMoreBtn.addEventListener("click", handleLoadMore);
    // }

};

export default movieSearchSidebarRender;
