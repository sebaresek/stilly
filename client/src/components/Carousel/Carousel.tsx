import React, { useEffect, useRef, useState } from 'react';
import { data } from './data';
import './Carousel.css';

export const Carousel: React.FC = () => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const listNode = listRef.current;

    if (listNode) {
      const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

      if (imgNode) {
        imgNode.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  }, [currentIndex]);

  const scrollToImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = curr === 0;
        return isFirstSlide ? data.length - 1 : curr - 1;
      });
    } else {
      setCurrentIndex(curr => (curr + 1) % data.length);
    }
  };
  

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="main-container">
      <div className="slider-container">
        <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10094;</div>
        <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10095;</div>
        <div className="container-images">
          <ul className='container-carousel-ul' ref={listRef}>
            {
              data.map((item) => {
                return <li className='container-carousel-il' key={item.id}>
                  <img className='carousel-img' src={item.imgUrl}/>
                </li>
              })
            }
          </ul>
        </div>
        <div className="dots-container">
            {data.map((_, idx) => (
                <div
                key={idx}
                className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(idx)}
                >
                
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};
