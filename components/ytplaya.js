import React, { Component, PropTypes } from "react"
import { connect } from "react-redux";
import { loadPlaylist, artistChange } from "../actions"
import PlayListItem from "./playlistitem"
import styles from "./ytplaya.css"
import * as Config from "../config"

/**
 * Youtube Playlist Component.
 * This component renders a simple playlist of 
 * finite set of videos retrieved from youtube search API.
 * A dropdown lets user change artist.
 */
class YTPlaya extends Component {
	render() {
		const { dispatch, currentArtist } = this.props;
		let playListDom;
		if(currentArtist && currentArtist in this.props.playLists) {
			const playlist = this.props.playLists[currentArtist];
			playListDom = playlist.map(item => {
				return (
					<PlayListItem key={item.id.videoId} 
								  channel={item.snippet.channelTitle}
								  thumbnail={item.snippet.thumbnails.default.url} 
								  title={item.snippet.title}/>
				);
			});
		}

		const selectValue = this.props.currentArtist || this.props.artists[Config.defaultArtist];
		return (
			<div>
				<div className={styles.playlist}>
					<div className={styles.topRow}>
						<label>
							Artist
							<select ref="artistSelect" onChange={e => this.handleArtistChange(e)} value={selectValue}>
								{ this.props.artists.map(item => <option key={item} value={item}>{item}</option>) }
							</select>
						</label>
					</div>
					{ playListDom }
					{ this.props.isLoading? <div className={styles.loading}>Loading ...</div> : "" }
				</div>
			</div>
		);
	}

	handleArtistChange(event) {
		const node = this.refs.artistSelect;
		const artist = node.value;
		this.props.dispatch(loadPlaylist(artist, this.props.apiKey));
		this.props.dispatch(artistChange(artist));
	}
}

YTPlaya.propTypes = {
	artists: PropTypes.arrayOf(PropTypes.string.isRequired),
	apiKey: PropTypes.string.isRequired
};

function propStateMap(state) {
	return {
		currentArtist: state.currentArtist,
		playLists: state.playLists,
		isLoading: state.isLoading
	};
}

export default connect(propStateMap)(YTPlaya);
