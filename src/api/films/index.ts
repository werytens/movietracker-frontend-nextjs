import { API_URL } from "../../http";
import axios from "axios";

import { filmsSearch } from "../search";

export class FilmsApi {
    static async getList(userId: number) {
        const response = await axios.get(API_URL + 'films/getlist/' + userId);

        return response
    }
    static async getListV2(userId: number) {
        const response = await axios.get(API_URL + 'films/getlist/v3/' + userId);

        return response
    }

    static async getFilm(filmId: number) {
        const response = await axios.get(API_URL + "films/get/" + filmId);
        
        return response
    }

    static async getStatuses() {
        const response = await axios.get(API_URL + "films/statuses");

        return response
    }

    static async addFilm(userId: number, filmId: number, name: string) {
        const imdbId = await filmsSearch.getImdbId(filmId);

        const response = await axios.post(API_URL + 'films/add', { userId, imdbId, filmId, name })

        return response
    }
	
    static async deleteFilm(userId: number, filmId: number) {
    	await axios.delete(API_URL + 'films/delete', { data: {userId, filmId} });
    }

    static async addWithoutIMDB(userId: number, kinopoiskId: number, name: string) {
        const response = await axios.post(API_URL + 'films/addkinopoisk', { userId, kinopoiskId, name })
    
        return response
    }

    static async changeFilmStatus(userId: number, filmId: number, statusId: number) {
        const response = await axios.patch(API_URL + 'films/status', {
            userId, filmId, statusId
        })

        return response
    }

    static async changeFilmRewatch(userId: number, filmId: number, rewatchCount: number) {
        const response = await axios.patch(API_URL + 'films/rewatch', {
            userId, filmId, rewatchCount
        })

        return response
    }

    static async changeFilmRate(userId: number, filmId: number, rate: number) {
        const response = await axios.patch(API_URL + 'films/rate', {
            userId, filmId, rate
        })

        return response
    }

    static async changeFilmDescription(userId: number, filmId: number, userDescription: string) {
        const response = await axios.patch(API_URL + 'films/description', {
            userId, filmId, userDescription
        })

        return response
    }
}

