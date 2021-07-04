import styles from './feed.module.css';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/Link';
import ReactAudioPlayer from 'react-audio-player';


const Feed = () => {
    return (
        <div className={styles.container}>
            <div className={styles.artwork}></div>
            <div className={styles.audioPlayer}>
                <ReactAudioPlayer
                    src=""
                    autoPlay
                    controls
                />
            </div>
            <div className={styles.snippetContent}>
                <h2>Podcast name</h2>
                <h3>Caption</h3>
                <button>Go to podcast</button>
            </div>
        </div>
    )
}

export default Feed