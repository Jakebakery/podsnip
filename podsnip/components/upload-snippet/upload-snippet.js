import styles from './upload-snippet.module.css';
import { useState } from 'react';
import { storage } from '../../Firebase';
import { ToastContainer, toast } from 'react-toast';

const UploadSnippet = () => {
    const [podcastLink, setPodcastLink] = useState("");
    const [podcastName, setPodcastName] = useState("");
    const [caption, setCaption] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);


    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!selectedFile) {
            alert('Nothing was attached');
        } else {
            const uuid = uuidv4();
            const meta = {
                contentType: "audio/mpeg",
            }
            storage.ref(`snippets/${uuid}`).put(selectedFile, meta).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    toast.success("Yeay! MP3 uploaded");
                    fetch('http://localhost:3000/snippet', {
                        method: 'POST',
                        headers: {
                            'Content-Type': "application/x-www-form-urlencoded",
                        },
                        body: JSON.stringify({
                            url: downloadURL,
                            caption: caption,
                            podcastName: podcastName,
                            podcastLink: podcastLink,
                        })
                    }).then((res) => res.json())
                    .then(() => {
                      toast.success("Yeay! New data is here.");
                    });
                });
            });


            alert(`Submitting form ${podcastLink}`);
        }
    }

    const onFileChange = (evt) => {
        setSelectedFile(evt.target.files[0]);
        setIsFilePicked(true);
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Upload Audio
                </h1>
                <form onSubmit={handleSubmit}>
                    <input className={styles.input}
                        type="file"
                        name="file"
                        onChange={onFileChange} />
                    <label className={styles.label}>
                        Link to podcast
                        <input
                            type="text"
                            value={podcastLink}
                            onChange={e => setPodcastLink(e.target.value)}
                        />
                    </label>
                    <label className={styles.label}>
                        Caption
                        <input
                            type="text"
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                        />
                    </label>
                    <label className={styles.label}>
                        Name of Podcast
                        <input
                            type="text"
                            value={podcastName}
                            onChange={e => setPodcastName(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <ToastContainer delay={3000} />
            </main>
        </div>
    );
}

export default UploadSnippet