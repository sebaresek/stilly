import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Cart.css';


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
  quantity?: number;
}

interface CartProps {
  isLoggedIn: boolean;
  setCart: React.Dispatch<React.SetStateAction<ClothingItem[]>>;
}

function parsePrice(price: string): number {
  return parseFloat(price.replace(/\$|,/g, '').replace(',', '.'));
}

export const Cart: React.FC<CartProps> = ({ setCart, isLoggedIn }) => {
  const [total, setTotal] = useState<number>(0);
  const [preferenceId, setPreferenceId] = useState(null);
  const [cartItems, setCartItems] = useState<ClothingItem[]>([]);

  initMercadoPago("TEST-ccc98e6a-55c3-41b3-8067-87d51057cd11");


  useEffect(() => {
    const cartData = localStorage.getItem("cart");

    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      setCartItems(parsedCart);

      const totalPrice = parsedCart.reduce(
        (accumulator: number, item: ClothingItem) =>
          accumulator + parsePrice(item.price),
        0
      );

      setTotal(totalPrice);
    }
  }, []);

  const onDeleteProduct = (productToDelete: ClothingItem) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== productToDelete.id
    );

    const totalPrice = updatedCart.reduce(
      (accumulator, item) => accumulator + parsePrice(item.price),
      0
    );
    setCartItems(updatedCart);
    setCart(updatedCart);
    setTotal(totalPrice);
    toast.success("Producto eliminado con éxito.", { autoClose: 3000 });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  
  const createPreference = async () => {
    try {
      const cartDataStr = localStorage.getItem("cart");
      if (cartDataStr !== null) {
        const cartData = JSON.parse(cartDataStr);
        let totalPrice = total;
  
        // Verificar si el total es un número entero
        if (totalPrice) {
          // Agregar tres ceros adicionales
          totalPrice *= 1000;
        }
        const response = await axios.post("http://localhost:3001/mercadopago", {
          description: "Productos de Stilly",
          price: totalPrice,
        });
        console.log(totalPrice, '::::::::::::')
        const { id } = response.data;
        console.log("Datos del carrito:", cartData);
        return id;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  const handleBuy = async () => {
    if (isLoggedIn) {
      const id = await createPreference();
      if (id) {
        setPreferenceId(id);
      }
    } else {
      toast.warning("Debes iniciar sesión para poder pagar.", { autoClose: 3000 });
    }
  };

  return (
    <div className="container-cart">
      <h1>Productos agregados al carrito</h1>
      <div className="container-cart-2">
        {cartItems.map((item) => (
          <div className={`container-card${item.offer ? ' offer' : ''}`}>
            <div className="container-card-images">
              <Carousel showThumbs={false} showStatus={false} className="custom-carousel">
                {item.image.split(",").map((imageUrl, index) => (
                  <div key={index} className="container-card-image">
                    <img key={index} src={imageUrl} alt={item.name} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="container-card-2">
              <div className="container-title-card">
                <Link to={`/detail/${item.id}`} className="link-card">
                  <h3>{item.name}</h3>
                </Link>
              </div>
              <div className="container-card-description">
                <p>{item.description}</p>
              </div>
              <div className="container-price-card">
                <h5>Precio: ${parsePrice(item.price).toLocaleString('en-US', { minimumFractionDigits: 3 })}</h5>
              </div>
              <div className="container-button-cart">
                <button onClick={() => onDeleteProduct(item)} className="button-cart">
                  ELIMINAR
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.3"
                    stroke="currentColor"
                    className="icon-close"
                  ><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container-pay-cart">
        {/* Formatear el total con comas y puntos */}
        <p>Total a Pagar: ${total.toLocaleString('en-US', { minimumFractionDigits: 3 })}</p>
        {isLoggedIn ? (
          <button className="button-cardsmen" onClick={handleBuy}>
            <span>Pagar Ahora</span>
          </button>
        ) : (
          <button className="button-cardsmen" onClick={handleBuy}>
            <span>Pagar Ahora</span>
          </button>
          
        )}
        {preferenceId && <Wallet initialization={{ preferenceId }} />}
      </div>
      <ToastContainer />
    </div>
  );
};
