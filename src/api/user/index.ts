import axios from "axios"
import { API_URL } from "../../http"

export class UserApi {
    static async changePassword(id: number, password: string) {
        const response = await axios.patch(API_URL + 'user/password', {
            id, password
        })

        return response
    }

    static async changeAvatar(id: number, link: string) {
        const response = await axios.patch(API_URL + 'user/avatar', {
            id, link
        })

        return response
    }

    static async getUserByNickname(username: string) {
        return await axios.get(API_URL + 'user/' + username)
    }
}