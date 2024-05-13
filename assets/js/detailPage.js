import { getCookie } from "../helper/cookies.js";
import fetchAPI, { API_DETAIL_MOVIE, API_FEATUREFILM, API_NEW_MOVIE, API_SEARCH_CATEGORY } from "./api.js";
import bannerDetailPage from "./bannerDetailPage.js";
import { getMoviesByAPI } from "./getDataAPI.js";
import { handleCategoryAlikeMoviesList } from "./global.js";
import { handleResize } from "./handleResize.js";
import headerBox from "./headerBox.js";
import { sidebar } from "./sidebar.js";
import sliderList from "./sliderList.js";


const detailPageRender = async () => {
    const segments = window.location.href.split("?")
    const movieSlug = segments[segments.length - 1].split("&")[0]
    if (!movieSlug) {
        window.location.href = "index.html";
    }
    await headerBox()
    await sidebar()
    await handleResize()

    const loadingTheme = document.querySelector("[loading-theme]")
    if (loadingTheme) {
        loadingTheme.classList.add("active")
    }
    await bannerDetailPage()

    const movieAlike = await handleCategoryAlikeMoviesList(movieSlug)
    const api1 = await API_SEARCH_CATEGORY + movieAlike
    const data1 = await getMoviesByAPI(api1, movieSlug)
    await sliderList(data1, "Phim liên quan", "phim-lien-quan", movieSlug)

    loadingTheme.classList.remove("active")

}
detailPageRender()



