import React from "react"
import { useNavigate } from "react-router-dom";
import { data } from '../../../images'
import { BsTagFill } from "react-icons/bs";
import './HomeWomen.css'

export const HomeWomen = () => {
    const navigate = useNavigate();

    return(
        <div className="container-cardswomen">
            {/* remeras */}
            <a href="/female/t-shirt&muscle"> 
                <div className="">
                    <div className="container-cardswomen2">
                        <img src={data[8].imgUrl} alt="" className="cardswomen-img"/>
                    </div>
                </div>
            </a>

            <a href="/female/shorts&pants">
                <div className="">
                    <div className="container-cardswomen2">
                        <img src={data[8].imgUrl} alt="" className="cardswomen-img"/>
                    </div>
                </div>
            </a>

            {/* pantalones */}
            <a href="/female/divers&jackets"> 
                <div className="">
                    <div className="container-cardswomen2">
                        <img src={data[8].imgUrl} alt="" className="cardswomen-img"/>
                    </div>
                </div>
            </a>


            <a href="/female/accessories"> 
                <div className="">
                    <div className="container-cardswomen2">
                        <img src={data[8].imgUrl} alt="" className="cardswomen-img"/>
                    </div>
                </div>
            </a>

            <div className="container-button-cardswomen">
                <button onClick={() => navigate('/female/all')} className="button-cardswomen"> 
                    <span>
                        VER TODAS LAS PUBLICACIONES
                    </span> 
                    <i>
                        <BsTagFill />
                    </i>
                </button>
            </div>
        </div>
    )
}