import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../../components/Loader/Loader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Link, useParams, useNavigate } from "react-router-dom";
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
  waist: string;
  color: string;
}

interface DetailProps {
  cart: ClothingItem[]; 
  setCart: React.Dispatch<React.SetStateAction<ClothingItem[]>>;
}

export const Detail: React.FC<DetailProps> = ({ cart, setCart }) => {
  const [characters, setCharacters] = useState<ClothingItem>();
  const imageUrls = characters?.image.split(",").map((imageUrl) => imageUrl.trim());
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [clickedElement, setClickedElement] = useState<string | null>(null);
  const [uniqueSizes, setUniqueSizes] = useState<{ value: string; id: number }[]>([]);
  const [uniqueColors, setUniqueColors] = useState<{ value: string; id: number }[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate()

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
          const sizesWithIds: { id: number; value: string }[] = [];
          const colorsWithIds: { id: number; value: string }[] = [];

          response.data.forEach((size: SizeItem) => {
            if (!selectedItem || (selectedItem.startsWith("#") && selectedItem === size.waist) || (selectedItem.startsWith("#") && selectedItem === size.color) || (selectedItem === size.color) || (selectedItem === size.waist)) {
              sizesWithIds.push({ id: size.id, value: size.waist });
              colorsWithIds.push({ id: size.id, value: size.color });
            }
          });
          setUniqueSizes(sizesWithIds);
          setUniqueColors(colorsWithIds);
          console.log("uniqueSizes:", sizesWithIds);
          console.log("uniqueColors:", colorsWithIds);
        })
        .catch((error) => {
          console.error("Error al obtener talles:", error);
        });
    }
  }, [characters, selectedItem]);


  const uniqueSizesFiltered = uniqueSizes
    .filter((size) => {
      if (selectedColor === null || selectedColor.startsWith("#")) {
        return true;
      }
      return uniqueColors.some((color) => color.value === selectedColor && color.id === size.id);
    })
    .filter((size, index, self) => {
      return index === self.findIndex((s) => s.value === size.value);
    });

  const uniqueColorsFiltered = uniqueColors
    .filter((color) => {
      if (selectedSize === null || !selectedSize.startsWith("#")) {
        return true; // Mostrar colores si no hay tamaño seleccionado o se seleccionó un color
      }

      return uniqueSizes.some((waist) => waist.value === selectedSize && waist.id === color.id);
    })
    .filter((color, index, self) => {
      return index === self.findIndex((c) => c.value === color.value);
    });

    
    const handleClick = (value: string) => {
      setSelectedItem(value);
      setClickedElement(value);
    };


    const handleAddToCart = () => {
      if (characters) {
        // Crear un objeto que representa el producto
        const productToAdd: ClothingItem = {
          id: characters.id,
          name: characters.name,
          price: characters.price,
          description: characters.description,
          gender: characters.gender,
          category: characters.category,
          waist: characters.waist,
          color: characters.color,
          sleeve: characters.sleeve,
          offer: characters.offer,
          image: characters.image,
        };
    
        // Agregar el producto al carrito
        const updatedCart = [...cart, productToAdd];
        setCart(updatedCart);
        console.log('producto agregado');
        toast.success("Producto agregado con éxito.", { autoClose: 3000 })
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    };
    
    
    

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
            <span>COLORES DISPONIBLES:</span>
            <ul>
              {uniqueColorsFiltered.map((color) => (
                <li key={color.id}>
                  <Link to={`/detail/${color.id}`}>
                    <span
                      className={`container-span-color ${clickedElement === color.value ? "selected" : ""}`}
                      onClick={() => handleClick(color.value)}>
                      {color.value}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
  
          <div className="container-detail-sizes">
            <span>TALLES DISPONIBLES:</span>
            <ul>
              {uniqueSizesFiltered.map((size) => (
                <li key={size.id}>
                  <Link to={`/detail/${size.id}`}>
                    <span
                      className={`container-span-size ${clickedElement === size.value ? "selected" : ""}`}
                      onClick={() => handleClick(size.value)}>
                      {size.value}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
  
          <div className="container-detail-button">
            <button className="button-add-cart" onClick={handleAddToCart}>
              AGREGAR AL CARRITO
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                strokeLinejoin="round"
                strokeLinecap="round"
                viewBox="0 0 24 24"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="icon">
                <circle r="1" cy="21" cx="9"></circle>
                <circle r="1" cy="21" cx="20"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>

            <div className="container-reset-button-detail">
              <a className="button-reset-detail" href={`/detail/${id}`}>
                Restablecer Selección
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  stroke="currentColor" 
                  width="20" 
                  height="21"
                  className="icon">
                  <path stroke-linecap="round" 
                  stroke-linejoin="round" 
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0">
                  </path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  ); 
};
