import { getState } from "redux";
import fetch from "isomorphic-fetch";
import _ from "lodash";

export const LOAD_PLAYLIST_START = "LOAD_PLAYLIST_START";
export const LOAD_PLAYLIST_END = "LOAD_PLAYLIST_END";
export const ARTIST_CHANGE = "ARTIST_CHANGE";

/**
 * Create Artist Change action
 * @param {string} artist new current artist
 * @returns {object} action
 */
export function artistChange(artist) {
	return {
		type: ARTIST_CHANGE,
		artist
	}
}

/**
 * Create Playlist loading start action
 * @param {string} artist artist being loaded
 * @returns {object} action
 */
function loadPlaylistStart(artist) {
	return {
		type: LOAD_PLAYLIST_START,
		artist
	}
}

/**
 * Create Playlist loading end action
 * @param {string} artist artist being loaded
 * @param {boolean} success true if the load succeeded
 * @param {array} items list of videos retrieved from youtube
 * @returns {object} action
 */
function loadPlaylistEnd(artist, success, items) {
	return {
		type: LOAD_PLAYLIST_END,
		success,
		artist,
		items
	}
}

/**
 * Creates async actions that loads a playlist
 * @param {string} artist artist to be loaded
 * @param {string} apiKey apiKey to be sent to youtube api
 * @returns {object} promise that resolve to a boolean indicating load success
 */
export function loadPlaylist(artist, apiKey) {
	return (dispatch, getState) => {

		const state = getState();
		if(state.playLists[artist]) {
			console.log("Playlist already exists");
			return Promise.resolve(true);
		}

		dispatch(loadPlaylistStart(artist));
		let url = "https://www.googleapis.com/youtube/v3/search?";
		let params = {
			maxResults: 10,
			key: apiKey,
			q: artist,
			part: "snippet",
			videoCategoryId: "Music",
			type: "video",
			videoEmbeddable: "true"
		};
		url += _.pairs(params).map(p => p[0] + "=" + encodeURIComponent(p[1])).join("&");

		return fetch(url, { method: "GET"})
		.then(response => response.json())
		.then(json => {
			if("error" in json) {
				dispatch(loadPlaylistEnd(artist, false));
			} else {
				dispatch(loadPlaylistEnd(artist, true, json.items));
			}
			return true;
		})
		.catch(e => {
			dispatch(loadPlaylistEnd(artist, false));
		});
	}
}