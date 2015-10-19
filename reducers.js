import { combineReducers } from "redux";
import * as Actions from "./actions";


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

function currentArtist(state = null, action) {
	switch(action.type) {
		case Actions.ARTIST_CHANGE:
			return action.artist;
		default:
			return state;
	}
}

const ytPlaya = combineReducers({
	currentArtist,
	isLoading,
	playLists
});

export default ytPlaya;
