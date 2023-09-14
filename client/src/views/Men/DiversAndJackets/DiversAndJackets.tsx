import React from 'react';
import { Card } from "../../../components/Card/Card";
import { useState, useEffect } from 'react';
import axios from "axios";

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

  
export const DiversAndJackets = () => {
    const [characters, setCharacters] = useState<ClothingItem[]>([]);
    
    useEffect(() => {
        axios.get(`http://localhost:3001/clothing/male/diversandjackets`)
            .then(response => {
                console.log(response.data)
                setCharacters(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error.message );
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

