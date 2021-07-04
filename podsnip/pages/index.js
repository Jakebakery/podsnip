import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Upload from './upload/upload.js'
import Feed from '../components/feed/feed.js'
import Link from 'next/Link'

export default function Home() {
  
  // Get a reference to the storage service, which is used to create references in your storage bucket

  return (
    <div className={styles.container}>
      <Feed>feed
      </Feed>
      <Link className={styles.uploadButton} href="/upload/upload">
        <a>Upload</a>
      </Link>
    </div>
  )
}