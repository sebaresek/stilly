import React from "react"
import { useNavigate } from "react-router-dom";
import { data } from '../../../images'
import { BsTagFill } from "react-icons/bs";
import './HomeMen.css'

export const HomeMen = () => {
    const navigate = useNavigate()

    

    return(
        <div className="container-cardsmen">
            {/* remeras & musculosas*/}
            <a href="/male/t-shirt&muscle"> 
                <div className="">
                    <div className="container-cardsmen2">
                        <img src={data[8].imgUrl} alt="" className="cardsmen-img"/>
                    </div>
                </div>
            </a>

            {/* shorts & pantalones */}
            <a href="/male/shorts&pants">
                <div className="">
                    <div className="container-cardsmen2">
                        <img src={data[8].imgUrl} alt="" className="cardsmen-img"/>
                    </div>
                </div>
            </a>

            {/* buzos & camperas */}
            <a href="/male/divers&jackets"> 
                <div className="">
                    <div className="container-cardsmen2">
                        <img src={data[8].imgUrl} alt="" className="cardsmen-img"/>
                    </div>
                </div>
            </a>


            <a href="/male/accessories"> 
                <div className="">
                    <div className="container-cardsmen2">
                        <img src={data[8].imgUrl} alt="" className="cardsmen-img"/>
                    </div>
                </div>
            </a>

            <div className="container-button-cardsmen">
                <button onClick={() => navigate('/male/all')} className="button-cardsmen"> 
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