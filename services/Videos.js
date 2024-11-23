import config from "../config/config.js";
import {HttpRequest} from "./Http.js";
import {HttpStream} from "./HttpStream.js";

export class Videos {

    static async getVideosFromPlaylist(playlistId) {
        const videos = await HttpRequest.request(config.host + 'events?filter=series:' + playlistId
            + ',status:EVENTS.EVENTS.STATUS.PROCESSED');
        return await Promise.all(
            videos.map(async video => {
                const publications = await HttpRequest.request(config.host + 'events/' + video.identifier + '/publications');
                const previewUrl = publications[0]['attachments']
                    .find(attachment => attachment['flavor'] === 'presenter/player+preview')['url'];
                const videoSize = (publications[0]['media'][0]['size'] / 1024 / 1024).toFixed(2);
                return {...video, preview: previewUrl, size: videoSize}
            })
        );
    }

    static async getStreams() {
        return await HttpStream.request(config.streamHost + 'plan');
    }

    static async getPlaylists() {
        return await HttpRequest.request(config.host + 'series');
    }

    static async getMediaContent(pathname) {
        if (pathname === '/streams') {
            return await HttpStream.request(config.streamHost + 'plan');
        } else if (pathname === '/playlists') {
            return await HttpRequest.request(config.host + 'series');
        }
    }

    static async getPlaylist(playlistId) {
        return await HttpRequest.request(config.host + 'series/' + playlistId);
    }

    static async getVideo(id) {
        const video = await HttpRequest.request(config.host + 'events/' + id);
        const url = await HttpRequest.request(config.host + 'events/' + id + '/publications');

        return {
            videoInfo: video,
            url: url[0].media[0].url
        }
    }
}