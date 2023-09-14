import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Card.css';

interface ClothingItem {
  id: number;
  name: string;
  category: string;
  gender: string;
  price: string;
  waist: string;
  color: string;
  sleeve: string;
  image: string;
  offer: boolean;
  description: string;
}

export const Card = (props: ClothingItem) => {
  const imageUrls = props.image.split(',').map((imageUrl) => imageUrl.trim());
  const cardClass = `container-card${props.offer ? ' offer' : ''}`;

  return (
    <div className={cardClass}>
      
      <div className="container-card-images">
        <Carousel showThumbs={false} showStatus={false} className="custom-carousel">
          {imageUrls.map((imageUrl, index) => (
            <div key={index} className="container-card-image">
              <img src={imageUrl} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="container-card-2">
        <div className="container-title-card">
          <Link to={`/detail/${props.id}`} className="link-card">
            <h3>{props.name}</h3>
          </Link>
        </div>

        <div className="container-card-description">
          <p>{props.description}</p>
        </div>

        <div className="container-price-card">
          <h5>Precio: {props.price}</h5>
        </div>
        

        <div className="container-button-card">
          <button className="button-card">VER DETALLES</button>
        </div>

        <span> </span>
      </div>
    </div>
  );
};