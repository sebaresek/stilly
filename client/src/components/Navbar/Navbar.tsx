import React from 'react';
import axios from 'axios';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { loadData } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';


interface NavbarProps {
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({isLoggedIn}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); 
  const dispatch = useDispatch();



  const onSearch = async (searchQuery: string) => {
    try {
      const URL = `http://localhost:3001/clothing/search?name=${searchQuery}`;
      const response = await axios.get(URL);
      const searchData = response.data;
      console.log('Respuesta de Axios:', searchData);

      if (searchData.length === 0) {
        console.log('No se encontraron prendas con ese nombre.');
      } else {
        console.log('::::::::::::::::', searchData)
        dispatch(loadData(response.data));
        // Navega a la página de resultados y pasa los resultados como estado
        navigate('/results', { state: { results: searchData } });
      }
    } catch (error: any) {
      console.error('Error al obtener datos:', error);
      if (error.response && error.response.status === 404) {
        console.log('La URL solicitada no fue encontrada en el servidor.');
      } else {
        console.log('Ocurrió un error al realizar la solicitud.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery)
  };

  const handleKeyPress  = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchQuery); 
    }
  };

  useEffect(() => {
    // Esta función se ejecutará cada vez que searchQuery se actualice
    console.log(searchQuery);
  }, [searchQuery]);
  



  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div>
      <div className={`container-navbar ${isFocused ? 'focused' : ''}`}>
        <div className='container-navbar-2'>
          <div className='container-navbar-3'>
            <section className='container-section-navbar'>
              <div className='container-section-navbar-2'>

                <div className='container-searchbar'>
                  <div
                    className='container-searchbar-3'>
                    <input className='container-input-navbar' 
                      type="text" placeholder="¿Qué estás buscando?" 
                      onChange={handleInputChange}
                      value={searchQuery}
                      onKeyPress={handleKeyPress} // Llama a onSearch cuando se presiona "Enter"
                      autoComplete="off" 
                      id="input-searchbar" 
                      onFocus={handleFocus} 
                      onBlur={handleBlur} 
                    />
                    <span className='container-span-navbar'>
                      <div className='container-span-navbar-2'>
                        <button className='searchbar-button' type='button'>
                          {/* ... AGREGAR FUNCIONABILIDAD EN EL SEARCH ... */}
                        </button>
                      </div>
                    </span>
                  </div>
                </div>

                <div className='container-img'>
                  <div className='container-img-2'>
                      <a href="/" className='container-img-a'>
                          <span className='container-img-span'>
                              {/* <img src='' alt="stilly" className='container-img-img'>  */}
                                <svg width="155" height="41" viewBox="0 0 155 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0 0.728001V39.928H22.064V32.032H8.4V0.728001H0Z" fill="black"/>
                                  <path d="M64.0268 20.328C64.0268 9.016 54.9548 0 43.5308 0C32.1068 0 23.0348 9.016 23.0348 20.328C23.0348 31.64 32.1068 40.656 43.5308 40.656C54.9548 40.656 64.0268 31.64 64.0268 20.328ZM55.4028 20.328C55.4028 27.104 50.1948 32.48 43.5308 32.48C36.8668 32.48 31.6588 27.104 31.6588 20.328C31.6588 13.552 36.8668 8.176 43.5308 8.176C50.1948 8.176 55.4028 13.552 55.4028 20.328Z" fill="black"/>
                                  <path d="M107.11 10.136C103.918 3.808 97.3096 0 89.4136 0C78.1576 0 68.9176 9.128 68.9176 20.328C68.9176 31.528 77.9336 40.656 89.3576 40.656C100.558 40.656 108.734 32.256 108.734 21.28V18.144H88.3496V25.2H99.7176C98.6536 29.68 94.6216 32.76 89.4136 32.76C82.6936 32.76 77.4296 27.216 77.4296 20.328C77.4296 13.384 82.6936 7.952 89.3576 7.952C93.8936 7.952 97.5336 10.024 99.4936 13.832L107.11 10.136Z" fill="black"/>
                                  <path d="M154.261 20.328C154.261 9.016 145.189 0 133.765 0C122.341 0 113.269 9.016 113.269 20.328C113.269 31.64 122.341 40.656 133.765 40.656C145.189 40.656 154.261 31.64 154.261 20.328ZM145.637 20.328C145.637 27.104 140.429 32.48 133.765 32.48C127.101 32.48 121.893 27.104 121.893 20.328C121.893 13.552 127.101 8.176 133.765 8.176C140.429 8.176 145.637 13.552 145.637 20.328Z" fill="black"/>
                                </svg>
                              {/* </img> */}
                          </span>
                      </a>
                  </div>
                </div> 

                <div className='micuenta-navbar'>
                    <div className='micuenta-navbar-2'>
                    <Link to={isLoggedIn ? "/myaccount" : "/login"} className='micuenta-navbar-a'>
                        <div className='micuenta-navbar-a-div'>
                          <span className='micuenta-navbar-a-span'>
                            {isLoggedIn ? "MI CUENTA" : "INGRESAR"}
                          </span>
                        </div>
                      </Link>
                    </div>
                </div>

                <div className='mipedido-navbar'>
                    <div className='mipedido-navbar-2'>
                      <button className='mipedido-navbar-button'>
                        <div className='mipedido-navbar-button-div'>
                          <span className='mipedido-navbar-button-span'>
                            MI PEDIDO
                            {/* ... AGREGAR FUNCIONABILIDAD EN MI PEDIDO... */}
                          </span>
                        </div>
                      </button>
                    </div>
                </div>

              </div>
            </section>
          </div>
        </div>
      </div>

      <div className='categorias-navbar'>
        <div className='categorias-navbar-2'>
          <div className='categorias-navbar-3'>
            <section className='categorias-navbar-section'>
              <ul className='categorias-navbar-ul'>
                <li className='categorias-navbar-li'> 
                  <a href="/sale" className='categorias-navbar-li-div-a'>
                    <div className='categorias-navbar-li-div-a-div'>
                      SALE
                    </div>
                  </a>
                </li>
                <li className='categorias-navbar-li'> 
                  <a href="/male" className='categorias-navbar-li-div-a'>
                    <div className='categorias-navbar-li-div-a-div-generico'>
                      HOMBRE
                    </div>
                  </a>
                </li>
                <li className='categorias-navbar-li'> 
                  <a href="/female" className='categorias-navbar-li-div-a'>
                    <div className='categorias-navbar-li-div-a-div-generico'>
                      MUJER
                    </div>
                  </a>
                </li>
                <li className='categorias-navbar-li'> 
                  <a href="/accessories" className='categorias-navbar-li-div-a'>
                    <div className='categorias-navbar-li-div-a-div-generico'>
                      ACCESORIOS
                    </div>
                  </a>
                </li>
                <li className='categorias-navbar-li'> 
                  <a href="/stilly" className='categorias-navbar-li-div-a'>
                    <div className='categorias-navbar-li-div-a-div-stilly'>
                      STILLY
                    </div>
                  </a>
                </li>
                <li className='categorias-navbar-li'> 
                  <a href="/location" className='categorias-navbar-li-div-a'>
                    <div className='categorias-navbar-li-div-a-div-generico'>
                      UBICACION
                    </div>
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>


    </div>
  );
};
