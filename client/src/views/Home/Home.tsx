import React from 'react';
import { Card } from "../../components/Card/Card";
import { Carousel } from "../../components/Carousel/Carousel"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { BsTagFill } from "react-icons/bs";
import './Home.css'



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

export const Home = () => {
    const [characters, setCharacters] = useState<ClothingItem[]>([]);
    const firstFourCharacters = characters.slice(0, 4);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3001/clothing/offer`)
            .then(response => {
                console.log(response.data)
                setCharacters(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, []); 

    return ( 
        <div>
            <Carousel/>
            <div className='container-cards'>
           {
              firstFourCharacters.map(item => (
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

            <div className="container-button-cardsmen">
                <button onClick={() => navigate('/sale')} className="button-cardsmen"> 
                    <span>
                        VER TODAS LAS OFERTAS
                    </span> 
                    <i>
                        <BsTagFill />
                    </i>
                </button>
            </div>
        </div>

    )
}