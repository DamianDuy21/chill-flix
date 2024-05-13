import { getCookie } from "../helper/cookies.js";
import fetchAPI, { API_DETAIL_MOVIE, API_SEARCH_CATEGORY, authenUser } from "./api.js";

let page = 1;
let limit = 10;
let slugList = []

const savedMovieRender = async () => {
    const user = await authenUser(getCookie("email"), getCookie("password"));
    console.log("User data:", user);
    if (user.data.length > 0) {
        try {
            slugList = user.data[0].movie.watchLater
        } catch (editError) {
            console.error("Error editing user:", editError);
            alert("Có lỗi xảy ra khi tải thông tin. Vui lòng thử lại sau.");
        }
    } else {
        alert("Có lỗi xảy ra khi tải thông tin. Vui lòng thử lại sau.");
    }
    const fetchMovie = async () => {
        const loadMoreBtn = document.querySelector("[sidebar-load-more-btn]");

        if (loadMoreBtn) {
            loadMoreBtn.classList.add("loading")
        }

        let maxIndex = (page * 10) < slugList.length ? (page * 10) : (slugList.length)
        console.log(maxIndex)
        let currentList = slugList.slice((page - 1) * 10, maxIndex)
        console.log(currentList)
        const result = await Promise.all(currentList.map(async (item) => {
            const movie_api = API_DETAIL_MOVIE + item;
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
        if (loadMoreBtn) {
            if (page * limit >= slugList.length) {
                loadMoreBtn.setAttribute("style", "display: none")
            }
        }
    };

    const handleLoadMore = async () => {
        await fetchMovie(++page);
    };


    const container = document.querySelector("[page-content]");

    const sidebarSearchList = `
    <section class="searchSidebar-list" searchSidebar-list>
        
        ${user.data[0].movie.watchLater.length > 0 ? (`
        <div class="title-wrapper">
            <h3 class="title-large">Danh sách phim đã lưu</h3>
        </div>
        `) : (`
        <div class="title-wrapper">
        <h3 class="title-large">Chưa có phim nào được lưu</h3>
    </div>
        `)}
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

export default savedMovieRender;
