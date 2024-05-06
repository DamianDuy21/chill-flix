import fetchAPI, { API_DETAIL_MOVIE, API_FEATUREFILM } from "./api.js";
import bannerWatchMoviePage from "./bannerWatchMoviePage.js";
import headerBox from "./headerBox.js";
import { sidebar } from "./sidebar.js";
import sliderList from "./sliderList.js";


const watchMoviePageRender = async () => {
    await headerBox()
    await sidebar()

    const loadingTheme = document.querySelector("[loading-theme]")
    if (loadingTheme) {
        loadingTheme.classList.add("active")
    }
    await bannerWatchMoviePage()

    const respone1 = await fetchAPI(API_FEATUREFILM)
    const result1 = respone1.data.items
    const dataPromises1 = result1.map(async (item) => {
        const api = API_DETAIL_MOVIE + item.slug;
        const movie = await fetchAPI(api);
        return movie;
    });

    // Wait for all asynchronous operations to complete
    const data1 = await Promise.all(dataPromises1);
    await sliderList(data1, "Phim lẻ", "phim-le")

    loadingTheme.classList.remove("active")
}
watchMoviePageRender()



