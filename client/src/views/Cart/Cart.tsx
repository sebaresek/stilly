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
}

interface CartProps {
  setCart: React.Dispatch<React.SetStateAction<ClothingItem[]>>;
}

// Función para convertir el precio de cadena de texto a número y cambiar las comas por puntos
function parsePrice(price: string): number {
  // Reemplazar comas por puntos y luego convertir a número
  return parseFloat(price.replace(/\$|,/g, '').replace(',', '.'));
}

export const Cart: React.FC<CartProps> = ({ setCart }) => {
  const [total, setTotal] = useState<number>(0);
  const [cartItems, setCartItems] = useState<ClothingItem[]>([]);

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
        <button className="button-cardsmen">
          <span>Pagar Ahora</span>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
