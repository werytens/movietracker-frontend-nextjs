import { API_URL } from "../../http";
import axios from 'axios';

export class AuthApi {
    static async registerUser(username: string, password: string) {
        const response = await axios.post(API_URL + 'auth/registration', {
            username, password, avatarLink: 'none'
        })

        return response;
    }

    static async loginUser(username: string, password: string) {
        const response = await axios.post(API_URL + 'auth/login', {
            username, password
        })

        return response;
    }
    
    static async me(token: string) {
        const response = await axios.get(API_URL + 'auth/me', {
            headers: {
                Authorization: token
            }
        });

        return response
    }
}