'use client';

import Image from 'next/image';
import React from 'react';

import styles from './Image.module.css';

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
        <Image fill alt={name} className={styles.img} src={imageUrl} />
        <h2>
          {name}
          <br />
          <span>{title}</span>
        </h2>
        <a href={link} rel="noopener noreferrer" target="_blank">
          Hire Me
        </a>
      </div>
    </div>
  );
};

export default ImageBox;
