import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Promotions } from './components/Promotions/Promotions';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './views/Home/Home';
import { Login } from './views/Login/Login'
import { ChangePass } from './views/RecoveryPass/InputPass';
import { OtpVerification } from './views/RecoveryPass/OTPInput'
import { MyAccount } from './views/MyAccount/MyAccount';
import { AllMen } from './views/Men/AllMen/AllMen';
import { AllWomen } from './views/Women/AllWomen/AllWomen';
import { Accessories } from './views/Accessories/Accessories'
import { Location } from './views/Location/Location';
import { Footer } from './components/Footer/Footer';
import { HomeMen } from './views/Men/HomeMen/HomeMen';
import { HomeWomen } from './views/Women/HomeWomen/HomeWomen';
import { Stilly } from './views/Stilly/Stilly';
import { AllOffer } from './views/Offer/Offer';
import { TShirtAndMuscle } from './views/Men/T-shirtAndMuscle/T-shirtAndMuscle';
import { ShortsAndPants } from './views/Men/ShortAndPants/ShortAndPants';
import { DiversAndJackets } from './views/Men/DiversAndJackets/DiversAndJackets';
import { AccessoriesMen } from './views/Men/Accesories/Accesories';
import { AccessoriesWomen } from './views/Women/Accesories/Accesories';
import { DiversAndJacketsWomen } from './views/Women/DiversAndJackets/DiversAndJackets';
import { ShortAndPantsWomen } from './views/Women/ShortAndPants/ShortAndPants';
import { TShirtAndMuscleWomen } from './views/Women/T-shirtAndMuscle/TShirtAndMuscle';
import { ResultsPage } from './views/Results/Results'
import { Detail } from './views/Detail/Detail';
import './App.css';




function App() {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] =  useState<boolean>(false);

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem("isLoggedIn");
  // };

  useEffect(() => {
    // Verificar si el usuario está autenticado en localStorage
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  console.log("isLoggedIn:", isLoggedIn);


  return (
    <div className="App">

      {location.pathname !== '/login'  
      && location.pathname !== "/recovery_otp"
      && location.pathname !== "/recovery_pass"
       ? (
        <div>
          <Promotions/>
          <Navbar isLoggedIn={isLoggedIn}/>
        </div> 
      ) : null}
      
      {/* <button onClick={handleLogout}>LOGOUT</button> */}
      
      <Routes>
        <Route path='/' element={<Home />} />

        {/* DATOS DEL USUARIO */}
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/recovery_otp' element={<OtpVerification />} />
        <Route path='/recovery_pass' element={<ChangePass />} />
        <Route path='/myaccount' element={<MyAccount />} />

        {/* ABOUT ME */}
        <Route path='/stilly' element={<Stilly />} />

        {/* OFERTAS */}
        <Route path='/sale' element={<AllOffer />} />

        {/* RUTAS HOMBRE */}
        <Route path='/male/all' element={<AllMen />} />
        <Route path='/male' element={<HomeMen />} />
        <Route path='/male/t-shirt&muscle' element={<TShirtAndMuscle />} />
        <Route path='/male/shorts&pants' element={<ShortsAndPants />} />
        <Route path='/male/divers&jackets' element={<DiversAndJackets />} />
        <Route path='/male/accessories' element={<AccessoriesMen />} />

        {/* RUTAS MUJER */}
        <Route path='/female' element={<HomeWomen />} />
        <Route path='/female/all' element={<AllWomen />} />
        <Route path='/female/t-shirt&muscle' element={<TShirtAndMuscleWomen />} />
        <Route path='/female/shorts&pants' element={<ShortAndPantsWomen />} />
        <Route path='/female/divers&jackets' element={<DiversAndJacketsWomen />} />
        <Route path='/female/accessories' element={<AccessoriesWomen />} />

        {/* RESULTADOS DEL SEARCHBAR */}
        <Route path='/results' element={<ResultsPage />} />

        {/* RUTAS ACCESORIOS */}
        <Route path='/accessories' element={<Accessories />} />

        {/* UBICACION */}
        <Route path='/location' element={<Location />} /> 

        {/* DETAIL */}
        <Route path='/detail/:id' element={<Detail />} /> 
        <Route path="/detail/:id/:size" element={<Detail />} />

      </Routes>

      {location.pathname !== '/login'  
      && location.pathname !== "/recovery_otp"
      && location.pathname !== "/recovery_pass"
       ? (
        <div>
          <Footer/>
        </div> 
      ) : null}

    </div>
  );
}

export default App;
