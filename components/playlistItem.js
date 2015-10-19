import styles from "./playlistitem.css"
import React, { Component, PropTypes } from "react"

/**
 * Youtube Playlist Item Component.
 * This component displays thumbnail, title and channel
 * details for a playlist item
 */
export default class PlayListItem extends Component {
	render() {
		return (
			<div className={styles.normal}>
				<span className={styles.thumb}>
					<img src={ this.props.thumbnail }/>
				</span>
				<div className={styles.title} title={this.props.title}>{ this.props.title }</div>
				<div className={styles.channel}>by { this.props.channel }</div>
			</div>
		);
	}
}

PlayListItem.propTypes = {
	title: PropTypes.string.isRequired,
	thumbnail: PropTypes.string.isRequired,
	channel: PropTypes.string.isRequired
}