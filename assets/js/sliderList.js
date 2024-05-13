
import { setCookie } from "../helper/cookies.js";
import fetchAPI, { API_DETAIL_MOVIE, API_FEATUREFILM } from "./api.js";


const sliderList = async (data, title, slug, movieSlug) => {
    const container = document.querySelector("[page-content]");
    const movieList = `
        <section class="movie-list">
            <div class="title-wrapper">
                <h3 class="title-large">${title}</h3>
                <a href="./movieSearch.html?3&${slug}&${movieSlug}" class="showmore-btn" show-more-btn=${slug}>
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
                                <a href="./detail.html?${item.movie.slug}" class="card-btn" 
                                    title=${item.movie.name}
                                    movie-slug=${item.movie.slug}
                                    movie-alike=${item.movie.category[0].slug}
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
};

export default sliderList;
