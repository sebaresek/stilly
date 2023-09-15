import { filterCards } from '../../redux/actions';
import { useDispatch} from 'react-redux';
import React, { useState } from 'react';
import './FilterT-shirt.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState<string>(''); 

  const handleClearFilter = () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedColor('');
    dispatch(filterCards({ waist: '', color: '', sleeve: '' })); 
  };


  const handleFilterColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (selectedColor === value) {
      setSelectedColor('');
      dispatch(filterCards({ color: '' }));
    } else {
        setSelectedColor(value);
        dispatch(filterCards({color: value, }));
      }
    };
      

  return (
    <div className='container-filter'>
      <h3> FILTROS </h3>

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
