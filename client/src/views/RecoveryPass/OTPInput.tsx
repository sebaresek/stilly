import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './OTPInput.css'


export const OtpVerification: React.FC = () => {
  const navigate = useNavigate()
  const [enteredOTP, setEnteredOTP] = useState('');
  const [timerCount, setTimerCount] = useState(0);
  const [disableResend, setDisableResend] = useState(false);
  // Obtener el email y OTP almacenado del localStorage
  const email = localStorage.getItem('userEmail');
  const storedOTPString = localStorage.getItem('recoveryOTP');
  const storedOTP = storedOTPString ? parseInt(storedOTPString) : 0;

  const handleVerifyOTP = () => {
    console.log('Entered OTP:', enteredOTP);
    console.log('Stored OTP:', storedOTP.toString());

    if (enteredOTP === storedOTP.toString()) {
      toast.success("Código verificado exitosamente.", { autoClose: 3000 })
      setTimeout(() => {
        navigate("/recovery_pass"); 
      }, 1000);
    } else {
      toast.error("El código que has introducido no es correcto, inténtalo de nuevo o reenvía el enlace.", { autoClose: 3000 });
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimerCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(interval);
          setDisableResend(false); // Habilita el botón de reenvío cuando el temporizador llega a 0
        }
        return prevCount - 1;
      });
    }, 1000);
  };


    const forwarding = () => {
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        axios
            .post("http://localhost:3001/recovery/email", {
            OTP,
            recipient_email: email,
            })
            .then(() => {
            // Guarda el nuevo OTP en el localStorage
            localStorage.setItem("recoveryOTP", OTP.toString());

            toast.success("Código OTP reenviado con éxito.", { autoClose: 3000 });
            setTimerCount(60); // Inicia el temporizador a 60 segundos
            setDisableResend(true); // Deshabilita el botón de reenvío
            startTimer(); // Inicia el temporizador
            })
            .catch(console.log);
    };

  


  return (

      <div className='container-otpinput'>
        <div className='container-otpinput-2'>
          <div className='container-otpinput-3'>
            <div className='container-otpinput-4'>
              <div className='container-otpinput-5'>
                <p className='verification-otp'>Verificación de Email</p>
              </div>
              
              <div className='container-otpinput-6'>
                <p className='verification-otp'>Hemos enviado un código a tu correo electrónico.</p>
              </div>
            </div>

            <div className='otpform'>         
                <div className='container-otpform'>
                  <div className='container-otpform-2'> 
                    <div className='form__group field'>
                      <input
                        className='form__field'
                        type="text"
                        maxLength={4}
                        placeholder="Ingrese el código"
                        value={enteredOTP}
                        onChange={(event) => {
                          const numericValue = event.target.value.replace(/\D/g, ''); // Remover caracteres no numéricos
                          const sanitizedValue = numericValue.slice(0, 4); // Tomar solo los primeros 4 dígitos
                          setEnteredOTP(event.target.value)
                          }
                        }
                      />
                      <label 
                        htmlFor="name" 
                        className='form__label'
                        > Ingrese el código
                      </label>
                    </div>

                    <div className='container-verifyotp'>
                      <div>
                        <button 
                          onClick={handleVerifyOTP}
                          className='button-verifiOtp'
                        >
                          Verificar Cuenta
                        </button>
                      </div>
                      
                      <div className='container-reenviarOtp'>
                      <p className='verification-otp'>¿No recibiste el código? 
                        <button 
                          className='button-reenviarOtp'
                          onClick={forwarding} 
                          disabled={disableResend}
                          >Reenviar
                        </button> 
                        {disableResend && 
                          <span 
                          className='span-reenviarCode'
                          > <br/>
                          Podra reenviar el código en  
                          {timerCount}s </span>
                        }
                      </p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
  );
};