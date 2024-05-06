import fetchAPI, { API_DETAIL_MOVIE, API_FEATUREFILM, API_TELEVISIONSERIES } from "./api.js";
import { bannerIndexPageControlHandler, bannerIndexPage } from "./bannerIndexPage.js";
import sliderList from "./sliderList.js";
import { sidebar } from "./sidebar.js";
import headerBox from "./headerBox.js";


const indexPageRender = async () => {
    await headerBox()
    await sidebar()
    await bannerIndexPage()

    //phim le
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

    //phim bo
    const respone2 = await fetchAPI(API_TELEVISIONSERIES)
    const result2 = respone2.data.items
    const dataPromises2 = result2.map(async (item) => {
        const api = API_DETAIL_MOVIE + item.slug;
        const movie = await fetchAPI(api);
        return movie;
    });

    // Wait for all asynchronous operations to complete
    const data2 = await Promise.all(dataPromises2);
    await sliderList(data2, "Phim bộ", "phim-bo")
}
indexPageRender()



