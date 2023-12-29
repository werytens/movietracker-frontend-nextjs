import axios from "axios"
import { API_KINOPOISK_KEY, API_KINOPOISKID_LINK, API_KINOPOISK_LINK } from "../../http"

export class filmsSearch {
    static async getFilms(keyword: string) {
        const response = await axios.get(API_KINOPOISK_LINK + keyword, {
            headers: {
                "X-API-KEY": API_KINOPOISK_KEY,
                "Content-Type": 'application/json' 
            }
        })

        return response
    }

    static async getImdbId(id: number) {
        const response = await axios.get(API_KINOPOISKID_LINK + id, {
            headers: {
                "X-API-KEY": API_KINOPOISK_KEY,
                "Content-Type": 'application/json' 
            }
        })

        return response.data.imdbId
    }
}