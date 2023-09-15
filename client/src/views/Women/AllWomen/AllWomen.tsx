import React from 'react';
import { Card } from "../../../components/Card/Card";
import { useSelector, useDispatch } from 'react-redux';
import { loadData } from '../../../redux/actions';
import { Filter } from '../../../components/Filters/FilterT-shirt';
import { Loader } from '../../../components/Loader/Loader';
import { useState, useEffect } from 'react';
import axios from "axios";
import './AllWomen.css'

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

  
export const AllWomen = () => {
    const [characters, setCharacters] = useState<ClothingItem[]>([]);
    const filteredCard = useSelector((state: any) => state.filteredCard);
    const filteredWaist = useSelector((state: any) => state.filteredWaist);
    const filteredColor = useSelector((state: any) => state.filteredColor);
    const filteredSleeve = useSelector((state: any) => state.filteredSleeve);
    const filteredPrice = useSelector((state: any) => state.filteredPrice);
    const dispatch = useDispatch();
    
    useEffect(() => {
        // Realiza una solicitud para obtener los datos de tu base de datos aquí
        // Por ejemplo, puedes usar fetch() para hacer una solicitud HTTP a tu API
        axios.get(`http://localhost:3001/clothing/female`)
            .then(response => {
                console.log(response.data)
                setCharacters(response.data);
                dispatch(loadData(response.data));
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, []); // Este efecto se ejecutará una sola vez al montar el componente

    return (
        <div className='container-t-shirt'>
          <Filter />
          <div className="container-cards">
            {(filteredWaist === null && filteredColor === null && filteredSleeve === null && filteredPrice === null) ? (
              characters.map((item: ClothingItem) => (
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
            ) : (filteredCard.length === 0) ? (
              <div className="container-msj-filter">
                <Loader />
                <br /> <br / ><br /> <br / ><br />
                <br /> <br / ><br /> <br / ><br />
                <h2>No hay elementos que coincidan con el filtro seleccionado.</h2>
                <br /> <br / > 
              </div>
            ) : (
              filteredCard.map((item: ClothingItem) => (
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
            )}
          </div>
        </div>
      );
    };

