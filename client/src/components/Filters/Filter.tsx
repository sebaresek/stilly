import { filterCards } from '../../redux/actions';
import { useDispatch} from 'react-redux';
import React, { useState } from 'react';
import './FilterT-shirt.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const [selectedWaist, setSelectedWaist] = useState<string>(''); 
  const [selectedColor, setSelectedColor] = useState<string>(''); 
  const [selectedPrice, setSelectedPrice] = useState<string>(''); 

  const handleClearFilter = () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedPrice('');
    setSelectedWaist('');
    setSelectedColor('');
    dispatch(filterCards({ waist: '', color: '', sleeve: '', price: '' })); 
  };

  const handleFilterWaist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (selectedWaist === value) {
      setSelectedWaist('');
      dispatch(filterCards({ waist: '', color: selectedColor, price: selectedPrice }));
    } else {
        setSelectedWaist(value);
        dispatch(filterCards({ waist: value, color: selectedColor, price: selectedPrice }));
      }    
    };

  const handleFilterColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (selectedColor === value) {
      setSelectedColor('');
      dispatch(filterCards({ waist: selectedWaist, color: '', price: selectedPrice }));
    } else {
        setSelectedColor(value);
        dispatch(filterCards({ waist: selectedWaist, color: value, price: selectedPrice }));
      }
    };

    const handleFilterPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (selectedPrice === value) {
          setSelectedPrice('');
          dispatch(filterCards({ waist: selectedWaist, color: selectedColor, price: '' }));
        } else {
          setSelectedPrice(value);
          dispatch(filterCards({ waist: selectedWaist, color: selectedColor, price: value }));
        }
      };
      

  return (
    <div className='container-filter'>
      <h3> FILTROS </h3>

      <h5>PRECIO </h5>
      <div>
        <div className='checklist-sleeve'>
            <input id='19' type='checkbox' onChange={handleFilterPrice} value='MENOS10000' checked={selectedPrice === 'MENOS10000'} />
            <label htmlFor='19'>MENOS DE $10.000</label>

            <input id='20' type='checkbox' onChange={handleFilterPrice} value='MAS10000' checked={selectedPrice === 'MAS10000'} />
            <label htmlFor='20'>$10.000 - $25.000</label>

            <input id='21' type='checkbox' onChange={handleFilterPrice} value='MAS30000' checked={selectedPrice === 'MAS30000'} />
            <label htmlFor='21'>MAS DE $25.000</label>
        </div>
      </div>

      <h5>TALLES</h5>
      <div>
        <div className='checklist-talles'>
            <input id='01' type='checkbox' onChange={handleFilterWaist} value='S' checked={selectedWaist === 'S'} />
            <label htmlFor='01'>S</label>

            <input id='02' type='checkbox' onChange={handleFilterWaist} value='M' checked={selectedWaist === 'M'} />
            <label htmlFor='02'>M</label>

            <input id='03' type='checkbox' onChange={handleFilterWaist} value='L' checked={selectedWaist === 'L'} />
            <label htmlFor='03'>L</label>

            <input id='04' type='checkbox' onChange={handleFilterWaist} value='XL' checked={selectedWaist === 'XL'} />
            <label htmlFor='04'>XL</label>

            <input id='05' type='checkbox' onChange={handleFilterWaist} value='XXL' checked={selectedWaist === 'XXL'} />
            <label htmlFor='05'>XXL</label>
        </div>
      </div>

      <div className='container-filter-colors'>
        <h5>COLORES</h5>
        <div className='checklist-colors'>
            <input id='06' type='checkbox' onChange={handleFilterColor} value='BLANCO' checked={selectedColor === 'BLANCO'} />
            <label htmlFor='06'>BLANCO</label>

            <input id='07' type='checkbox' onChange={handleFilterColor} value='GRIS' checked={selectedColor === 'GRIS'} />
            <label htmlFor='07'>GRIS</label>

            <input id='08' type='checkbox' onChange={handleFilterColor} value='GRIS CLARO' checked={selectedColor === 'GRIS CLARO'} />
            <label htmlFor='08'>GRIS CLARO</label>

            <input id='09' type='checkbox' onChange={handleFilterColor} value='GRIS OSCURO' checked={selectedColor === 'GRIS OSCURO'} />
            <label htmlFor='09'>GRIS OSCURO</label>

            <input id='10' type='checkbox' onChange={handleFilterColor} value='NEGRO' checked={selectedColor === 'NEGRO'} />
            <label htmlFor='10'>NEGRO</label>
            
            <input id='11' type='checkbox' onChange={handleFilterColor} value='AZUL' checked={selectedColor === 'AZUL'} />
            <label htmlFor='11'>AZUL</label>
            
            <input id='12' type='checkbox' onChange={handleFilterColor} value='NARANJA' checked={selectedColor === 'NARANJA'} />
            <label htmlFor='12'>NARANJA</label>
            
            <input id='13' type='checkbox' onChange={handleFilterColor} value='ROJO' checked={selectedColor === 'ROJO'} />
            <label htmlFor='13'>ROJO</label>
            
            <input id='14' type='checkbox' onChange={handleFilterColor} value='BORDO' checked={selectedColor === 'BORDO'} />
            <label htmlFor='14'>BORDO</label>

            <input id='15' type='checkbox' onChange={handleFilterColor} value='VERDE' checked={selectedColor === 'VERDE'} />
            <label htmlFor='15'>VERDE</label>
        </div>
      </div>

      <div>
        <button className='button-filter' onClick={handleClearFilter}>
            <span className="label">Limpiar Filtros</span>
            <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
            </span>
        </button>
      </div>

      
    </div>
  );
};
