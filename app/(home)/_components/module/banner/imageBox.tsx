'use client';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import styles from './Image.module.css';

interface BoxProps {
  imageUrl: string;
  name: string;
  title: string;
  link: string;
}

const ImageBox: React.FC<BoxProps> = ({ imageUrl, name, title, link }) => {
  const sparkleWrapperRef = useRef<HTMLDivElement>(null);

  // Create sparkle effect
  useEffect(() => {
    if (!sparkleWrapperRef.current) return;

    const wrapper = sparkleWrapperRef.current;
    const createSparkles = () => {
      // Clear previous sparkles
      wrapper.innerHTML = '';

      // Create new sparkles
      for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');

        sparkle.className = styles.sparkle;

        // Random size between 2px and 5px
        const size = Math.random() * 3 + 2;

        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;

        // Random position
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;

        // Random delay for animation
        sparkle.style.animationDelay = `${Math.random() * 1}s`;

        // Random color within warning palette
        const colors = ['#ffd700', '#ffb300', '#ff9800', '#ff6d00'];

        sparkle.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];

        wrapper.appendChild(sparkle);
      }
    };

    createSparkles();

    // Recreate sparkles every 3 seconds when hovered
    let interval: NodeJS.Timeout;
    const boxElement = wrapper.closest(`.${styles.box}`);

    if (boxElement) {
      boxElement.addEventListener('mouseenter', () => {
        createSparkles();
        interval = setInterval(createSparkles, 3000);
      });

      boxElement.addEventListener('mouseleave', () => {
        clearInterval(interval);
      });
    }

    return () => {
      clearInterval(interval);
      if (boxElement) {
        boxElement.removeEventListener('mouseenter', () => {});
        boxElement.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <Image fill alt={name} className={styles.img} src={imageUrl} />
        <div ref={sparkleWrapperRef} className={styles.sparkleWrapper} />
        <h2>
          {name}
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
