import { useState, useEffect } from "react";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import styles from "../styles/Home.module.css";
// import Styles from '../styles/'
import Image from "next/image";
export default function () {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      setBlogs(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getBlogs();
  });
  const deleteBlog = async (id) => {
    const blogDoc = doc(db, "blogs", id);
    await deleteDoc(blogDoc);
  };
  return (
    <div>
      <div className={styles.header}>
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={20} />
        </span>
        <span className={styles.span}>
          <h2>Welcome to Blogging Application</h2>
        </span>
      </div>
      {blogs.map((blog) => {
        return (
          <div className={styles.container}>
            <span>
              <img
                src={blog.url}
                alt="image"
                height={"100px"}
                width={"100px"}
              ></img>
            </span>
            <span className={styles.card}>
              <span><label>Author</label>
              <input disabled value={blog.author}/> 
              </span>
              <span><label>Title</label>
              <input disabled value={blog.title}/>
              </span>
              <span><label>Description</label>
              <input disabled value={blog.description}/>
              </span>
              <span><label>Content</label>
              <textarea disabled rows="5" value={blog.content}/></span>
              <span className={styles.btn}>
              <button
                type="submit"
                onClick={() => {
                  deleteBlog(blog.id);
                }}
              >
                Delete
              </button></span>
            </span>
            <p className={styles.date}>{blog.time}</p>
          </div>
        );
      })}
    </div>
  );
}
