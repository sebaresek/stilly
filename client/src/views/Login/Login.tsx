import React, { useState, useRef } from 'react';
import axios from 'axios';
import validation from './Validation';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './Login.css'; 

interface UserData{
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  address: string,
  city: string,
  postalCode: string,
  phoneNumber: string
}

interface Errors{
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  address?: string,
  city?: string,
  postalCode?: string,
  phoneNumber?: string
}

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}


export const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()
  const [rememberMe, setRememberMe] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [userData, setUserData] = useState <UserData> ({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
  })

  const handleTogglePanel = () => {
    setIsRegisterActive(!isRegisterActive);
  };

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };



  const navigateToOtp = () => {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      axios
        .post("http://localhost:3001/recovery/email", {
          OTP,
          recipient_email: email,
        })
        .then(() =>{
          localStorage.setItem('userEmail', email);
          //guardamos el OTP generado
          localStorage.setItem("recoveryOTP", OTP.toString());
          toast.success("Email enviado con exito.", { autoClose: 3000 })
          setTimeout(() => {
            navigate("/recovery_otp"); 
          }, 1000);
        })
        
        .catch(console.log);
    }
    return toast.error("Por favor, ingrese su email.", { autoClose: 3000 });
  }
  



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));

    const fieldErrors = validation({ ...userData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name as keyof Errors],
    }));

    if (fieldErrors[name as keyof Errors]) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        toast.error(fieldErrors[name as keyof Errors], { autoClose: 3000 });
      }, 1000);
    }
  };



  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
      axios
        .post("http://localhost:3001/login/register", {
          id:1,
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
          address: userData.address,
          city: userData.city,
          postalCode: userData.postalCode,
          phoneNumber: userData.phoneNumber
        })
        .then(({ data }) => {
          console.log(data);
          toast.success("Registro exitoso. Por favor, inicie sesión.", { autoClose: 3000 });
        });        
  };



  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
        
      });
      if (response.status === 200) {
        if (rememberMe) {
          // Almacenar el token en localStorage
          localStorage.setItem("accessToken", response.data.token);
        }
        localStorage.setItem("isLoggedIn", "true"); // Indicar que el usuario está autenticado
        setIsLoggedIn(true);
        navigate('/');
      } 
    } catch (error) {
      // La función axios.isAxiosError(error) se utiliza para determinar si el objeto de error pasado como argumento es uno de estos errores específicos generados por Axios. Retorna true si es un error de Axios y false si no lo es.
      if (axios.isAxiosError(error)) {

        if (error.response) {
          const status = error.response.status;

          if (status === 403) {
            toast.error("Credenciales inválidas.", { autoClose: 3000 });
          } else if (status === 404) {
            toast.error("Usuario no encontrado.", { autoClose: 3000 });
          } else {
            console.log('Error de respuesta del servidor:', error.response.data);
            toast.error("Ha ocurrido un error en el servidor.", { autoClose: 3000 });
          }

        } else {
          console.log('Error en la solicitud:', error.message);
          toast.error("Error en la solicitud. Verifica tu conexión.", { autoClose: 3000 });
        }

      } else {
        console.log('Ha ocurrido un error en el cliente:', error);
      }
    }
  };
  
  
  
  return (
    <div className='login-container-principal'>
       <div className={`container ${isRegisterActive ? 'right-panel-active' : ''}`}>
        <div className="form-container register-container">
          <form className='login-form' action="#">
            <h1 className='login-h1'>Registrese aquí</h1>
              <div>
                <input 
                  className='login-input-2' 
                  type='text'
                  name="firstName" 
                  placeholder="Nombre"
                  autoComplete='off'
                  value={userData.firstName}
                  onChange={handleChange} />

                <input 
                  className='login-input-2' 
                  type='text'
                  name="lastName" 
                  placeholder="Apellido"
                  autoComplete='off'
                  value={userData.lastName}
                  onChange={handleChange} />
              </div>

              <input 
                className='login-input' 
                type='text'
                name="email" 
                placeholder="Email" 
                autoComplete='off'
                value={userData.email}
                onChange={handleChange}/>

              <input 
                className='login-input' 
                type='password'
                name="password" 
                placeholder="Contraseña" 
                autoComplete='off'
                value={userData.password}
                onChange={handleChange} />
                
              <div>
                <input 
                  className='login-input' 
                  type='text'
                  name="address" 
                  placeholder="Dirección" 
                  autoComplete='off'
                  value={userData.address}
                  onChange={handleChange} />

                <input 
                  className='login-input-3' 
                  type='text' 
                  name="city" 
                  placeholder="Provincia"
                  autoComplete='off' 
                  value={userData.city}
                  onChange={handleChange} />

                <input 
                  className='login-input-4' 
                  type='text'
                  name="postalCode" 
                  placeholder="Codigo Postal" 
                  autoComplete='off'
                  value={userData.postalCode}
                  onChange={handleChange}/>
              </div>

              <input 
                className='login-input' 
                type='text' 
                name="phoneNumber" 
                placeholder="Número de Celular" 
                autoComplete='off'
                value={userData.phoneNumber}
                onChange={handleChange} />

            <button className='login-button' onClick={handleSubmit}>Registrarse</button>

            {/* <span className='login-span'>o use su cuenta</span>
            <div className="social-container">
              <a href="#" className="social"><i className="lni lni-facebook-fill"></i></a>
              <a href="#" className="social"><i className="lni lni-google"></i></a>
              <a href="#" className="social"><i className="lni lni-linkedin-original"></i></a>
            </div> */}

          </form>
        </div>

        <div className="form-container login-container">
          <form className='login-form' action="#">
            <h1 className='login-h1'>Entre aquí</h1>
            <input 
              className='login-input' 
              type="email" 
              name='email'
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)}/>

            <input 
              className='login-input' 
              type='password'
              name="password"  
              placeholder="Contraseña" 
              onChange={(e) => setPassword(e.target.value)} />

            <div className="content">
              <div className="checkbox">

              <input 
                type="checkbox" 
                name="rememberMe" 
                id="rememberMe" 
                checked={rememberMe}
                onChange={handleRememberMeChange}/>
              <label htmlFor='rememberMe' >Recordarme</label>
              </div>
              <div className="pass-link">
                <a 
                  className='login-a' 
                  // href="/recover-pass"
                  onClick={navigateToOtp}
                  >Olvidé mi contraseña </a>
              </div>
            </div>

            <button className='login-button' onClick={handleLogin}>Ingresar</button>

            {/* <span className='login-span'>o use su cuenta</span>
            <div className="social-container">
              <a href="#" className="social"><i className="lni lni-facebook-fill"></i></a>
              <a href="#" className="social"><i className="lni lni-google"></i></a>
              <a href="#" className="social"><i className="lni lni-linkedin-original"></i></a>
            </div> */}
          </form>
        </div>

        <div className="overlay-container">
          <div className={`overlay ${isRegisterActive ? 'right-panel-active' : ''}`}>
            <div className="overlay-panel overlay-left">
              <h1 className="login-title">Hola <br /> Amigos</h1>
              <p className='login-p'>Si tienes una cuenta, inicia sesión aquí y diviértete</p>
              <button className="login-button ghost" id="login" onClick={handleTogglePanel}>
                Ingresar
                <i className="lni lni-arrow-left login"></i>
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="login-title">Comineza tu <br /> viaje ahora</h1>
              <p className='login-p'>Si aún no tienes una cuenta, únete a nosotros y comienza tu viaje</p>
              <button className="login-button ghost" id="register" onClick={handleTogglePanel}>
                Registrarme
                <i className="lni lni-arrow-right register"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

