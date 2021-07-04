import styles from './upload-snippet.module.css';
import { useState } from 'react';
import { storage } from '../../Firebase';

const UploadSnippet = () => {
    const [podcastLink, setPodcastLink] = useState("");
    const [podcastName, setPodcastName] = useState("");
    const [caption, setCaption] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const snippetUrl = "";
    /*
    const storeSnippetFile = (fileUrl) => {
        fetch('https://localhost:8080/upload-snippet/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            file: fileUrl,
            caption: caption,
            podcastName: podcastName,
            podcastLink: podcastLink,
        })
    });   
    }*/

    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(!selectedFile){
            alert('Nothing was attached');
        } else{
            const uuid = uuidv4();
            const meta = {
                contentType: "audio/mpeg",
            }
            storage.ref(`snippets/${uuid}`).put(selectedFile, meta).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    snippetUrl = downloadUrl;
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
            </main>
        </div>
    );
}

export default UploadSnippet