import { Card } from "../../components/Card/Card";
import { useState, useEffect } from 'react';
import axios from "axios";
import React from 'react';
import './Accessories.css'

// Define un tipo que representa la estructura de datos esperada
interface ClothingItem {
    id: number;
    name: string;
    description: string;
    gender: string,
    category: string;
    price: string;
    waist: string;
    color: string;
    sleeve: string;
    offer: boolean;
    image: string;
  } 

  
export const Accessories = () => {
    const [characters, setCharacters] = useState<ClothingItem[]>([]);
    
    useEffect(() => {
        // Realiza una solicitud para obtener los datos de tu base de datos aquí
        // Por ejemplo, puedes usar fetch() para hacer una solicitud HTTP a tu API
        axios.get(`http://localhost:3001/clothing/accessories`)
            .then(response => {
                console.log(response.data)
                setCharacters(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, []); // Este efecto se ejecutará una sola vez al montar el componente

    return (
        <div className='container-cards'>
           {
              characters.map(item => (
                <Card
                   key={item.id}
                   id={item.id}
                   name={item.name}
                   description={item.description}
                   gender={item.gender}
                   category={item.category}
                   price={item.price}
                   waist={item.waist}
                   color={item.color}
                   sleeve={item.sleeve}
                   offer={item.offer}
                   image={item.image}
                />
              ))
           }
        </div>
     )
}

