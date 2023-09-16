import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Filter } from '../../components/Filters/Filter';
import { Loader } from '../../components/Loader/Loader';
import { Card } from '../../components/Card/Card';

interface Result {
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

export const ResultsPage = () => {
  const location = useLocation();
  const results: Result[] = location.state.results;
  const filteredCard = useSelector((state: any) => state.filteredCard);
  const filteredWaist = useSelector((state: any) => state.filteredWaist);
  const filteredColor = useSelector((state: any) => state.filteredColor);
  const filteredSleeve = useSelector((state: any) => state.filteredSleeve);
  const filteredPrice = useSelector((state: any) => state.filteredPrice);

  return (
    <div className='container-t-shirt'>
      <Filter />
      <div className="container-cards">
        {(filteredWaist === null && filteredColor === null && filteredSleeve === null && filteredPrice === null) ? (
          results.map((item: Result) => (
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
          filteredCard.map((item: Result) => (
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