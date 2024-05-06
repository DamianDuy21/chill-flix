import fetchAPI, { API_DETAIL_MOVIE, API_FEATUREFILM, API_NEW_MOVIE, API_SEARCH_CATEGORY } from "./api.js";
import bannerDetailPage from "./bannerDetailPage.js";
import headerBox from "./headerBox.js";
import { sidebar } from "./sidebar.js";
import sliderList from "./sliderList.js";


const detailPageRender = async () => {
    await headerBox()
    await sidebar()

    const loadingTheme = document.querySelector("[loading-theme]")
    if (loadingTheme) {
        loadingTheme.classList.add("active")
    }
    await bannerDetailPage()

    const movieAlike = await localStorage.getItem("movie-alike")
    const api = await API_SEARCH_CATEGORY + movieAlike
    const respone1 = await fetchAPI(api)
    const result1 = await Promise.all(respone1.data.items.map(async (item) => {
        if (item.slug != localStorage.getItem("movie-slug")) {
            const movie_api = API_DETAIL_MOVIE + item.slug;
            const data = await fetchAPI(movie_api);
            if (!data || !data.movie) {
                return;
            }
            return data
        }
        return
    }));

    // Wait for all asynchronous operations to complete
    const filteredResult1 = result1.filter(item => item !== undefined);
    await sliderList(filteredResult1, "Phim liên quan", "phim-lien-quan")

    loadingTheme.classList.remove("active")

}
detailPageRender()



