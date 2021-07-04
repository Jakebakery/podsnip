import styles from './upload.module.css';
import Head from 'next/head';
import UploadSnippet from '../../components/upload-snippet/upload-snippet';
import Link from 'next/Link';

export default function Layout() {

    return (
        <div className={styles.container}>
            <Head>

            </Head>
            <Link href="/">
                <a>Back to home</a>
            </Link>
            <UploadSnippet>
            </UploadSnippet>
        </div>
    );
}