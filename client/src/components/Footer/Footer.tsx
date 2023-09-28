import React from "react";
import {data} from '../../images';
import './Footer.css'


export const Footer = () => {

    return(
        <div className="footer">
            <div className="sb__footer section__padding">
                <div className="sb__footer-links">
                    <div className="sb__footer-links-div sb__footer-largo">
                        <h4> CONTENIDO </h4>
                        <a href="/faqs"> 
                            <p> Preguntas Frecuentes</p>
                        </a>

                        <a href="/exchanges"> 
                            <p> Cambio y devoluciones</p>
                        </a>
                    </div>

                    <div className="sb__footer-links-div">
                        <h4> RECURSOS  </h4>
                        <a href="/payments"> 
                            <p> Formas de pago</p>
                        </a>

                        <a href="/shipping"> 
                            <p> Formas de envío</p>
                        </a>
                    </div>

                    <div className="sb__footer-links-div footer-stilly">
                        <h4>COMPANY STILLY</h4>
                        <a href="/location"> 
                            <p> Contacto</p>
                        </a>
                        <a href="/stilly"> 
                            <p> Nosotros </p>
                        </a>
                    </div>

                    <div className="sb__footer-links-div">
                        <h4>SEGUINOS EN NUESTRAS REDES!</h4>
                            <div className="socialmedia-footer">
                                <a href="/insta"> 
                                    <img src={data[2].imgUrl} alt="instagram" /> 
                                </a>
                                <a href="/insta"> 
                                    <img src={data[4].imgUrl} alt="facebook" /> 
                                </a>
                            </div>
                    </div>

                    <hr />

                    <div className="sb__footer-below">
                        <div className="sb__footer-copyright">
                            <p>
                                @{new Date().getFullYear()} STILLY. Todos los derechos reservados.
                            </p>
                        </div>
                        <div className="sb__footer-below-links">
                            <a href="/terms"><div><p>Terminos & Condiciones</p></div></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}