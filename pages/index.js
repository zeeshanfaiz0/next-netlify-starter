import React from 'react'
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className={styles.container} style={{ alignItems: "center" }}>
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={20} />
        </span>
        <span className={styles.spa}>
          <h2>Welcome to Blogging Application</h2>
        </span>
      </div>
      <div className={styles.btn}>
        <Link href="/allBLogs">
          <a className={styles.Linka}> View Blogs </a>
        </Link>
        <Link href="/createBlog">
          <a className={styles.Linka}> Create Blog </a>
        </Link>
      </div>
    </>
  );
}
