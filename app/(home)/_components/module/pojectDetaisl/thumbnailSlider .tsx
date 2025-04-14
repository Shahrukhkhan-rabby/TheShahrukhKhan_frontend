'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

interface TThumbnailSliderProps {
  images: string[];
  currentImageIndex: number;
  handleImageChange: (index: number) => void;
}

const ThumbnailSlider: React.FC<TThumbnailSliderProps> = ({
  images,
  currentImageIndex,
  handleImageChange,
}) => {
  return (
    <Swiper
      breakpoints={{
        640: { slidesPerView: 4 }, // sm
        1024: { slidesPerView: 5 }, // lg
        1280: { slidesPerView: 6 }, // xl
      }}
      className="w-full"
      slidesPerView={4} // Default for xs screens
      spaceBetween={10}
      onSlideChange={(swiper) => handleImageChange(swiper.activeIndex)}
    >
      {images.map((image: string, index: number) => (
        <SwiperSlide key={index}>
          <Image
            alt={`Thumbnail ${index + 1}`}
            className={`w-24 h-16 m-2 object-cover rounded-lg cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 ${
              currentImageIndex === index ? 'border-2 border-warning' : ''
            }`}
            height={500}
            src={image}
            width={500}
            onClick={() => handleImageChange(index)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ThumbnailSlider;
