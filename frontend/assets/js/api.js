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
export const API_USERS = `https://chill-flix-backend-a4bb.onrender.com/v1/api/users`
export const API_USER = `https://chill-flix-backend-a4bb.onrender.com/v1/api/user`

const fetchAPI = async (API_KEY) => {
    try {
        const response = await fetch(API_KEY)
        return await response.json()
    } catch (error) {
        console.log('Error', error)
    }
}

export const authenUser = async (email, password) => {
    try {
        let api = API_USERS
        if (email && password) {
            api += `?email=${email}&password=${password}`
            const response = await fetch(api)
            return await response.json()
        }
        else {
            return { er: 500, data: [] }
        }

    } catch (error) {
        console.log('Error', error)
    }
}

export const editUser = async (data) => {
    try {
        let api = API_USER
        if (data) {
            const response = await fetch(api, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            return await response.json()
        }
        else {
            return { er: 500, data: [] }
        }

    } catch (error) {
        console.log('Error', error)
    }
}

export const addUser = async (data) => {
    try {
        let api = API_USER
        if (data) {
            const response = await fetch(api, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            return await response.json()
        }
        else {
            return { er: 500, data: [] }
        }

    } catch (error) {
        console.log('Error', error)
    }
}

export default fetchAPI