import React from 'react';
import { data } from '../../images.js';
import { FcInvite, FcCallback } from "react-icons/fc";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './Location.css'



export const Location = () => {
    console.log(data);
    const apiKey = 'AIzaSyDv6in8q91e3CdXIPEjquE703ohdJEv-AM'
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: apiKey
    });
    
    if (!isLoaded) {
      return <div>Loading ...</div>;
    }

    return (
      <div className='container-location'>
        <div className='image-container'>
          <img src={data[0].imgUrl} alt="Imagen" className='img-location-1' />
          <img src={data[1].imgUrl} alt="Imagen" className='img-location-2' />
        </div>
        <div className='container-location-2'>
          <h1>Contactanos </h1>
          <div className='container-location-3'>
            <div className='map-container'>
              <GoogleMap zoom={15} center={{ lat: -27.388586, lng: -55.916696 }} mapContainerClassName='map' >
                <Marker position={{ lat: -27.388586, lng: -55.916696 }} />
              </GoogleMap>
            </div>
            <div className='container-location-4'>
              <h4>No dudes en contactarte con nosotros para que podamos ayudarte con las consultas sobre tu compra!</h4>
              <h4> <FcCallback className='icons-location'/> 3765-084215</h4>
              <h4>< FcInvite className='icons-location'/> indurmentariastilly@gmail.com</h4>
              <h4>seguinos en nuestras redes sociales</h4>
              <div className='social-icon-location'>
                <a className='svg-location-I' href="https://www.linkedin.com/in/sebaresek/" target="_blank" rel="noopener">
                  <img src={data[2].imgUrl} alt="instagram" className='img-location-istagram' />
                </a>
                <a className='svg-location-F' href="https://www.linkedin.com/in/sebaresek/" target="_blank" rel="noopener">
                  <img src={data[4].imgUrl} alt="facebook" className='img-location-facebook' />
                </a>
              </div>
            </div>
          </div>
        </div> 
      </div>
    );
}




