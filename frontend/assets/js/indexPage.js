import fetchAPI, { API_DETAIL_MOVIE, API_FEATUREFILM, API_TELEVISIONSERIES } from "./api.js";
import { bannerIndexPageControlHandler, bannerIndexPage } from "./bannerIndexPage.js";
import sliderList from "./sliderList.js";
import { sidebar } from "./sidebar.js";
import headerBox from "./headerBox.js";
import { getMoviesByAPI } from "./getDataAPI.js";
import { handleResize } from "./handleResize.js";


const indexPageRender = async () => {
    // await handleUnAuthened()
    await headerBox()
    await sidebar()
    await handleResize()

    const loadingTheme = document.querySelector("[loading-theme]")
    if (loadingTheme) {
        loadingTheme.classList.add("active")
    }
    await bannerIndexPage()

    //phim le
    const data1 = await getMoviesByAPI(API_FEATUREFILM)
    await sliderList(data1, "Phim lẻ", "phim-le", "phim-le")

    //phim bo
    const data2 = await getMoviesByAPI(API_TELEVISIONSERIES)
    await sliderList(data2, "Phim bộ", "phim-bo", "phim-bo")

    loadingTheme.classList.remove("active")
}
indexPageRender()



