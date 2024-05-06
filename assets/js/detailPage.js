import fetchAPI, { API_DETAIL_MOVIE, API_FEATUREFILM, API_NEW_MOVIE, API_SEARCH_CATEGORY } from "./api.js";
import bannerDetailPage from "./bannerDetailPage.js";
import { getMoviesByAPI } from "./getDataAPI.js";
import { handleResize } from "./handleResize.js";
import headerBox from "./headerBox.js";
import { sidebar } from "./sidebar.js";
import sliderList from "./sliderList.js";


const detailPageRender = async () => {
    await handleResize()
    await headerBox()
    await sidebar()

    const loadingTheme = document.querySelector("[loading-theme]")
    if (loadingTheme) {
        loadingTheme.classList.add("active")
    }
    await bannerDetailPage()

    const movieAlike = await localStorage.getItem("movie-alike")
    const api1 = await API_SEARCH_CATEGORY + movieAlike
    const data1 = await getMoviesByAPI(api1)
    await sliderList(data1, "Phim liên quan", "phim-lien-quan")

    loadingTheme.classList.remove("active")

}
detailPageRender()



