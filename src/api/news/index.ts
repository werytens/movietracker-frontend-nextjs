import axios from "axios"
import { API_URL } from "../../http"

export class NewsApi {
    static async getNews() {
        const response = await axios.get(API_URL + 'news/get');

        return response
    }

    static async createNewPost(title: string, description: string, image: string) {
        const response = await axios.post(API_URL + 'news/create', 
            {
                title, description, image
            }
        )

        return response
    }

    static async editDescription(id: number, description: string) {
        const response = await axios.patch(API_URL + 'news/description', { id, description } )

        return response
    }

    static async editTitle(id: number, title: string) {
        const response = await axios.patch(API_URL + 'news/title', { id, title } )

        return response
    }

    static async editImage(id: number, image: string) {
        const response = await axios.patch(API_URL + 'news/image', { id, image } )

        return response
    }

    static async delete(id: number) {
        const response = await axios.delete(API_URL + 'news/delete', { data:  {id} } )

        return response
    }
}