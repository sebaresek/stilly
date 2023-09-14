import React from 'react';
import { useLocation } from 'react-router-dom';
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

  return (
    <div className='container-cards'>
    {
    results.map(item => (
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
  );
};
