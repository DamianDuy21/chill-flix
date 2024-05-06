import fetchAPI, { API_DETAIL_MOVIE, API_FEATUREFILM, API_NEW_MOVIE } from "./api.js";
import bannerDetailPage from "./bannerDetailPage.js";
import headerBox from "./headerBox.js";
import { sidebar } from "./sidebar.js";
import sliderList from "./sliderList.js";


const detailPageRender = async () => {
    await headerBox()
    await sidebar()
    await bannerDetailPage()

    const respone1 = await fetchAPI(API_FEATUREFILM)
    console.log(respone1)
    const result1 = respone1.data.items
    const dataPromises1 = result1.map(async (item) => {
        const api = API_DETAIL_MOVIE + item.slug;
        const movie = await fetchAPI(api);
        return movie;
    });

    // Wait for all asynchronous operations to complete
    const data1 = await Promise.all(dataPromises1);
    await sliderList(data1, "Phim lẻ", "phim-le")
}
detailPageRender()



