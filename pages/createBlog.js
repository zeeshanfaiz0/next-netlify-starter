import { useState } from "react";
import { db, storage } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import styles from "../styles/createBlog.module.css";
import Link from 'next/link';
export default function create() {
  const blogCollectionRef = collection(db, "blogs");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const imageRef = ref(storage, `/pics/${file.name}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setUrl(url));
      }
    );
  };
  const newBlog = async () => {
    await addDoc(blogCollectionRef, {
      title: title,
      content: content,
      description: description,
      author: author,
      time: Date.now(),
      url: url,
    });
  };

  return (
    <div className={styles.contain}>
      <h1>Create Blog</h1>
      <span className={styles.content}>
        <label>Author</label>
        <input
          type="text"
          placeholder="Author..."
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
        ></input>
      </span>
      <span className={styles.content}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Title..."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
      </span>
      <span className={styles.content}>
        <label>Description</label>
        <textarea
        placeholder="Description..."
          type="text"
          rows="2"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></textarea>
      </span>
      <span className={styles.content}>
        <label>Content</label>
        <textarea
          type="text"
          placeholder="Content..."
          className={styles.texta}
          rows="5"
          onChange={(event) => {
            setContent(event.target.value);
          }}
        ></textarea>
      </span>
      <form onSubmit={handleSubmit}>
        <span>
          <label>Upload Image</label>
          <input type="file" accept="image/*" name="image" id="file" />
          <button type="submit">upload</button>
        </span>
      </form>
      {progress > 0 && <h3>Uploaded {progress} % </h3>}{" "}
      <button type="submit" onClick={newBlog}>
        Submit
      </button>
      <Link href="/allBLogs"><a className={styles.Linka}>View Blogs</a></Link>
    </div>
  );
}
