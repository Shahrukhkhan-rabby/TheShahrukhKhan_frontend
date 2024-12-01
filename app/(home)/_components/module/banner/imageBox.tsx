"use client";

import styles from "./Image.module.css";
import Image from "next/image";
import React from "react";

interface BoxProps {
  imageUrl: string;
  name: string;
  title: string;
  link: string;
}

const ImageBox: React.FC<BoxProps> = ({ imageUrl, name, title, link }) => {
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <Image src={imageUrl} alt={name} fill className={styles.img} />
        <h2>
          {name}
          <br />
          <span>{title}</span>
        </h2>
        <a href={link} target="_blank" rel="noopener noreferrer">
          Hire Me
        </a>
      </div>
    </div>
  );
};

export default ImageBox;
