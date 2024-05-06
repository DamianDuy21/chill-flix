export const API_FEATUREFILM = `https://phimapi.com/v1/api/danh-sach/phim-le`
export const API_TELEVISIONSERIES = `https://phimapi.com/v1/api/danh-sach/phim-bo`
export const API_CARTOON = `https://phimapi.com/v1/api/danh-sach/hoat-hinh`
export const API_TVSHOWS = `https://phimapi.com/v1/api/danh-sach/tv-shows`
export const API_CATEGORY = `https://phimapi.com/the-loai`
export const API_SEARCH_CATEGORY = `https://phimapi.com/v1/api/the-loai/`
export const API_COUNTRY = `https://phimapi.com/quoc-gia`
export const API_NEW_MOVIE = `https://phimapi.com/danh-sach/phim-moi-cap-nhat`
export const API_DETAIL_MOVIE = `https://phimapi.com/phim/`
export const API_SEARCH_MOVIE = `https://phimapi.com/v1/api/tim-kiem`
const fetchAPI = async (API_KEY) => {
    try {
        const response = await fetch(API_KEY)
        return await response.json()
    } catch (error) {
        console.log('Error', error)
    }
}


export default fetchAPI