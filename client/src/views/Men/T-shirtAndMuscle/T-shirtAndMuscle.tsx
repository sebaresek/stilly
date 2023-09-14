import React from 'react';
import { Card } from "../../../components/Card/Card";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { filterCards, loadData  } from '../../../redux/actions';
import { useSelector } from 'react-redux';
import './T-shirtAndMuscle.css'


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

  
  export const TShirtAndMuscle = () => {
    const [characters, setCharacters] = useState<ClothingItem[]>([]);
    const filteredCard = useSelector((state: any) => state.filteredCard);
    const filteredWaist = useSelector((state: any) => state.filteredWaist);
    const dispatch = useDispatch();

    
    useEffect(() => {
      axios.get(`http://localhost:3001/clothing/male/t-shirtandmuscle`)
        .then(response => {
          console.log(response.data);
          setCharacters(response.data);
          dispatch(loadData(response.data));
        })
        .catch(error => {
          console.error('Error al obtener datos:', error.message);
        });
    }, []);

    const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log("Selected waist:", event.target.value);
      dispatch(filterCards({ waist: event.target.value }));
    };
  
    return (
        <div className="container-cards">
          <select onChange={handleFilter}>
            <option value="">Seleccionar Talle</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
          
    
          {filteredWaist === null ? (
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
              )
            )
          ) : filteredCard.length === 0 ? (
            <div className="">
                {/* <div className="spinner"></div> */}
                <div className="loader"></div>
                {/* <div className="wrapper">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                </div> */}
                <br />
                <p>No hay elementos que coincidan con el talle seleccionado.</p>
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
      );
    };