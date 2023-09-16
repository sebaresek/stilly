import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../../components/Loader/Loader";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Detail.css";

interface ClothingItem {
  id: number;
  name: string;
  description: string;
  gender: string;
  category: string;
  price: string;
  waist: string;
  color: string;
  sleeve: string;
  offer: boolean;
  image: string;
}

interface SizeItem {
  id: number;
  waist: string[];
  color: string[];
}

export const Detail = () => {
  const [characters, setCharacters] = useState<ClothingItem>();
  const [uniqueColors, setUniqueColors] = useState<string[]>([]);
  const [availableSizes, setAvailableSizes] = useState<SizeItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const imageUrls = characters?.image.split(",").map((imageUrl) => imageUrl.trim());
  const [sizeIdMap, setSizeIdMap] = useState<{ [waist: string]: number }>({});

  const { id } = useParams();
  const [uniqueSizes, setUniqueSizes] = useState<string[]>([]);

  useEffect(() => {
    if (availableSizes.length > 0) {
      const uniqueSizeSet = new Set<string>();
      const uniqueColorSet = new Set<string>();

      availableSizes.forEach((size) => {
        size.waist.forEach((waistSize) => {
          uniqueSizeSet.add(waistSize);
        });

        size.color.forEach((color) => {
          uniqueColorSet.add(color);
        });
      });

      const uniqueSizeArray = Array.from(uniqueSizeSet);
      const uniqueColorArray = Array.from(uniqueColorSet);

      setUniqueSizes(uniqueSizeArray);
      setUniqueColors(uniqueColorArray);
    }
  }, [availableSizes]);

  useEffect(() => {
    if (availableSizes.length > 0) {
      const sizeIdMapping: { [waist: string]: number } = {};

      availableSizes.forEach((size) => {
        size.waist.forEach((waistSize) => {
          sizeIdMapping[waistSize] = size.id;
        });
      });

      setSizeIdMap(sizeIdMapping);
    }
  }, [availableSizes]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/clothing/detail/${id}`)
      .then((response) => {
        console.log(response.data);
        setCharacters(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  useEffect(() => {
    if (characters) {
      const nameLowerCase = characters.name.toLowerCase();
      axios
        .get(`http://localhost:3001/clothing/sizes/${nameLowerCase}`)
        .then((response) => {
          console.log(response.data);
          setAvailableSizes(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener talles:", error);
        });
    }
  }, [characters]);

//   if (!characters) {
//     return <Loader />;
//   }

  return (
    <div className="container-detail">
      <div className="container-detail-img">
        <Carousel showThumbs={false} showStatus={false} className="custom-carousel-detail">
          {imageUrls?.map((imageUrl, index) => (
            <div key={index} className="">
              <img src={imageUrl} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="container-detail-info">
        <div className="container-name-price">
          <div className="container-detail-name">
            <span>{characters?.name}</span>
          </div>

          <div className="container-detail-price">
            <span>{characters?.price}</span>
          </div>
        </div>

        <div className="container-detail-info-2">
          <div className="container-detail-description">
            <span>{characters?.description}</span>
          </div>

          <div className="container-detail-color">
            <span> COLORES DISPONIBLES: </span>
            <ul>
              {uniqueColors.map((color, index) => (
                <li key={index}>
                  <span
                    className={`container-span-color ${selectedColor === color ? "selected" : ""}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="container-detail-sizes">
            <span> TALLES DISPONIBLES: </span>
            <ul>
              {uniqueSizes.map((size, index) => (
                <li key={index}>
                  <a href={`/detail/${sizeIdMap[size]}`}>
                    <span
                      className={`container-span-size ${selectedSize === size ? "selected" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="container-detail-button">
            <button className="button-add-cart">
              AGREGAR AL CARRITO
              <span> </span>
              <span> </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                stroke-linejoin="round"
                stroke-linecap="round"
                viewBox="0 0 24 24"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
                className="icon"
              >
                <circle r="1" cy="21" cx="9"></circle>
                <circle r="1" cy="21" cx="20"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
