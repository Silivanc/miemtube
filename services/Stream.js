import config from "../config/config.js";
import {HttpRequest} from "./Http.js";

export class Streams {
    
    static async getStreams() {
        return await HttpRequest.request(config.stream + 'plan', "GET", null, true);
    }

    static async getProfiles() {
        return await HttpRequest.request(config.stream + 'source-profile', "GET", null, true);
    }

    static async planStream(body) {
        return await HttpRequest.request(config.stream + 'plan', "POST", body, true);
    }

}