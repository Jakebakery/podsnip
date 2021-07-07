import styles from './feed.module.css';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/Link';
import ReactAudioPlayer from 'react-audio-player';

const Feed = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.artwork}></div>
            <div className={styles.audioPlayer}>
                <ReactAudioPlayer
                    src={feedData.feedData.podcastFile}
                    autoPlay
                    controls
                />
            </div>
            <div className={styles.snippetContent}>
                <h2>{props.feedData.podcastName}</h2>
                <h3>{props.feedData.podcastCaption}</h3>
                <button>{props.feedData.podcastLink}</button>
            </div>
        </div>
    )
}

export default Feed