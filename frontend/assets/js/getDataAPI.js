
import fetchAPI, { API_DETAIL_MOVIE } from "./api.js";

export const getMoviesByAPI = async (api, movieSlug) => {
    const respone = await fetchAPI(api)
    const result = await Promise.all(respone.data.items.map(async (item) => {
        if (item.slug != movieSlug) {
            const movie_api = API_DETAIL_MOVIE + item.slug;
            const data = await fetchAPI(movie_api);
            if (!data || !data.movie) {
                return;
            }
            return data
        }
        return
    }));

    const filteredResult = result.filter(item => item !== undefined);
    return filteredResult
}

