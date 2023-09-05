import { Routes, Route } from 'react-router-dom';
import { Promotions } from './components/Promotions/Promotions';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './views/Home/Home';
import { Login } from './views/Login/Login'
import { ChangePass } from './views/RecoveryPass/InputPass';
import { OtpVerification } from './views/RecoveryPass/OTPInput'
import { MyAccount } from './views/MyAccount/MyAccount';
import './App.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] =  useState<boolean>(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

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
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/recovery_otp' element={<OtpVerification />} />
        <Route path='/recovery_pass' element={<ChangePass />} />
        <Route path='/myaccount' element={<MyAccount />} />
      </Routes>

    </div>
  );
}

export default App;
