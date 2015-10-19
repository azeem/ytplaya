import { combineReducers } from "redux";
import * as Actions from "./actions";


/**
 * isLoading state that indicates if an item is being loaded
 */
function isLoading(state = false, action) {
	switch(action.type) {
		case Actions.LOAD_PLAYLIST_START:
			return true; 
		case Actions.LOAD_PLAYLIST_END:
			return false;
		default:
			return state;
	}
}

/**
 * playLists state that stores all available playlist data
 */
function playLists(state = {}, action) {
	switch(action.type) {
		case Actions.LOAD_PLAYLIST_END:
			return Object.assign({}, state, {
				[action.artist]: action.items
			});
		default:
			return state;
	}
}

/**
 * currentArtist state that stores the currently selected artist
 */
function currentArtist(state = null, action) {
	switch(action.type) {
		case Actions.ARTIST_CHANGE:
			return action.artist;
		default:
			return state;
	}
}


/**
 * root reducer for the app
 */
const ytPlaya = combineReducers({
	currentArtist,
	isLoading,
	playLists
});

export default ytPlaya;
