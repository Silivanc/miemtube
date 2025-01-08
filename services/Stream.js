import config from "../config/config.js";
import {HttpRequest} from "./Http.js";

export class Streams {
    

    static async getStreams() {
        return await HttpRequest.request(config.stream + 'plan', "GET", null, true);
    }
    static async getStreams1() {
        return await HttpRequest.request(config.stream + 'server', "GET", null, true);
    }
    static async getStreams2() {
        return await HttpRequest.request(config.stream + 'source-profile', "GET", null, true);
    }
}