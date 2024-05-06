import fetchAPI, { API_DETAIL_MOVIE, API_FEATUREFILM, API_TELEVISIONSERIES } from "./api.js"
import { handleToDetailPage } from "./global.js"
let page = 1
let limit = 9
const movieSearchShowMoreBtnSliderListRender = async () => {
    const searchType = localStorage.getItem("search-type")
    const classify = localStorage.getItem("search-slug")
    const fetchMovie = async () => {
        let api = ''
        if (classify == "phim-le") {
            api = API_FEATUREFILM
        }
        else if (classify == "phim-bo") {
            api = API_TELEVISIONSERIES
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
            console.log(filteredResult)
            const gridList = document.querySelector("[showMoreBtn-grid-list]")
            filteredResult.forEach(item => {
                gridList.innerHTML += item;
            });
        }



    }

    const handleLoadMore = async () => {
        await fetchMovie()
        page++
    }

    const handleShowUp = () => {
        const searchShowMoreBtnList = document.querySelector("[searchShowMoreBtn-list]")
        if (searchType == "show-more-btn") {
            searchShowMoreBtnList.classList.add("active")
        }
        else {
            searchShowMoreBtnList.classList.remove("active")
        }
    }

    const container = document.querySelector("[page-content]")

    const showMoreBtnSearchList = `
    <section class="searchShowMoreBtn-list" searchShowMoreBtn-list>
        <p class="label">Results for</p>
        <div class="title-wrapper">
            <h3 class="title-large">${localStorage.getItem("search-name")}</h3>
        </div>
        <div class="grid-list" showMoreBtn-grid-list>

        
        </div>

        <button class="btn load-more" showMoreBtn-load-more-btn>Load more</button>

    </section>
    `

    container.innerHTML += showMoreBtnSearchList
    await handleShowUp()
    await handleLoadMore()
    await handleToDetailPage()
    const loadMoreBtn = document.querySelector("[showMoreBtn-load-more-btn]");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", handleLoadMore);
    }

}
export default movieSearchShowMoreBtnSliderListRender