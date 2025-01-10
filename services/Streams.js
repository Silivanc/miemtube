import config from "../config/config.js";
import {HttpRequest} from "./Http.js";

export class Streams {
    
    //streams
    static async getStream(streamId) {
        return await HttpRequest.request(config.stream + 'plan/' + streamId, "GET", null, true);
    }

    static async getStreams(limit = 100, status = "", title = "") {
        const streamStatus = (status && status !== "") ? "&stream_status=" + status : ""; 
        const streamTitle = (title && title !== "") ? "&name=" + title : ""; 
        const result = await HttpRequest.request(config.stream + 'plan?limit=' + limit + streamStatus + streamTitle, "GET", null, true);
        
        return result;
    }

    static async planStream(body) {
        return await HttpRequest.request(config.stream + 'plan', "POST", body, true);
    }

    //profiles
    static async getProfiles() {
        return await HttpRequest.request(config.stream + 'source-profile', "GET", null, true);
    }

    //services
}