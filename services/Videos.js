import config from "../config/config.js";
import {HttpRequest} from "./Http.js";
import {HttpStream} from "./HttpStream.js";
import { convertMillsToSeconds } from "../utils/convertMillsToSeconds.js"

export class Videos {

    static async getVideosFromPlaylist(playlistId) {
        const videos = await HttpRequest.request(config.host + 'events?filter=series:' + playlistId
            + ',status:EVENTS.EVENTS.STATUS.PROCESSED');
            console.log(videos);    
        return await Promise.all(
            videos.map(async video => {
                const publications = await HttpRequest.request(config.host + 'events/' + video.identifier + '/publications', 'GET', null, true);
                console.log(publications);
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

    static async getVideosWithFullInfo(limit = "", title = "") {
        const videoTitle = title && title !== "" ? "textFilter:" + title : ""; 
        const videos = await HttpRequest.request(config.host + 'events?filter=status:EVENTS.EVENTS.STATUS.PROCESSED,' + videoTitle + '&limit=' + limit);

        return await Promise.all(
            videos.map(async video => {
                const publications = await HttpRequest.request(config.host + 'events/' + video.identifier + '/publications', 'GET', null, true);
                const previewUrl = publications[0]?.['attachments']
                    .find(attachment => attachment['flavor'].split('/')[1] === 'player+preview')?.['url'];
                const duration = convertMillsToSeconds(publications[0]['media'][0]['duration']);
                const videoSize = (publications[0]?.['media'][0]['size'] / 1024 / 1024).toFixed(2);
                return {...video, preview: previewUrl, size: videoSize, duration: duration}
            })
        );
    }

    static async getVideos(limit = "", title = "") {
        const playlistTitle = title !== "" ? "&filter=textFilter:" + title : ""; 
        return await HttpStream.request(config.host + 'events?limit=' + limit + playlistTitle);
    }

    static async getVideosWithDuration(limit = "") {
        const videos = await HttpStream.request(config.host + 'events?limit=' + limit);
        return await Promise.all(
            videos.map(async video => {
                const publications = await HttpRequest.request(config.host + 'events/' + video.identifier + '/publications', 'GET');
                console.log(publications);
                const duration = convertMillsToSeconds(publications[0]['media'][0]['duration']);
                return {...video, duration: duration}
            })
        );
    }

    static async getPlaylists(limit = "", title = "") {
        const playlistTitle = (title && title !== "") ? "&filter=textFilter:" + title : ""; 
        return await HttpRequest.request(config.host + 'series?limit=' + limit + playlistTitle);
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
        const url = await HttpRequest.request(config.host + 'events/' + id + '/publications', 'GET', null, true);

        return {
            videoInfo: video,
            url: url[0].media[0].url
        }
    }
}