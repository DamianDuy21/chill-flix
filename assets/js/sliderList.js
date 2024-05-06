import fetchAPI, { API_DETAIL_MOVIE, API_FEATUREFILM } from "./api.js";
import { handleToDetailPage } from "./global.js";

const sliderList = async (data, title, slug) => {
    const container = document.querySelector("[page-content]");

    const handleShowMoreBtn = () => {
        localStorage.setItem("search-slug", slug);
        localStorage.setItem("search-type", "show-more-btn");
        localStorage.setItem("search-name", title);
    };

    const movieList = `
        <section class="movie-list">
            <div class="title-wrapper">
                <h3 class="title-large">${title}</h3>
                <a href="./movieSearch.html" class="showmore-btn" show-more-btn=${slug}>
                    <span>Xem thêm</span>
                </a>
            </div>
            <div class="slider-list">
                <div class="slider-inner">
                    ${data.map(item => {
        return `
                            <div class="movie-card">
                                <div class="poster-box card-banner">
                                    <img src=${item.movie.poster_url} alt=${item.movie.name} class="img-cover" loading="lazy">
                                </div>
                                <h4 class="title">${item.movie.name}</h4>
                                <div class="meta-list">
                                    <div class="card-badge">${item.movie.year}</div>
                                </div>
                                <a href="./detail.html" class="card-btn" 
                                    title=${item.movie.name}
                                    movie-slug=${item.movie.slug}
                                    todetail
                                ></a>
                            </div>
                        `;
    }).join("")}
                </div>
            </div>
        </section>
    `;

    container.innerHTML += movieList;
    await handleToDetailPage();

    const showMoreBtn = document.querySelector("[show-more-btn]");

    // showMoreBtn.addEventListener("click", handleShowMoreBtn);
    container.addEventListener("click", (event) => {
        const target = event.target.closest("[show-more-btn]");
        if (target) {
            const clickedSlug = target.getAttribute("show-more-btn");
            if (clickedSlug === slug) {
                handleShowMoreBtn();
            }
        }
    });
};

export default sliderList;
