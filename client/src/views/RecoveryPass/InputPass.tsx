import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './OTPInput.css'


export const ChangePass: React.FC = () => {
    const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
    const email = localStorage.getItem('userEmail')
    console.log(email)


    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>, inputName: string) => {
      const value = event.target.value;
      setPasswords(prevPasswords => ({
        ...prevPasswords,
        [inputName]: value,
      }));
    };


    const updatePass = (newPassword: string, email: string) => {
        axios.post("http://localhost:3001/recovery/pass", {
              newPassword,
              email,
        })
        .then(response => {
                console.log(response.data.message);
              })
        .catch(error => {
                console.error('Error:', error.response.data.error);
              });
      }


      const handleResetPassword = () => {
        const newPassword = passwords.newPassword;
        const confirmPassword = passwords.confirmPassword;
      
        if (newPassword.length < 6 || !/\d/.test(newPassword)) {
          toast.error("La nueva contraseña debe tener al menos 6 caracteres y al menos un número.", { autoClose: 3000 });
        } else if (newPassword !== confirmPassword) {
          toast.error("Las contraseñas no coinciden.", { autoClose: 3000 });
        } else {
          // Verificar si el valor de email es nulo antes de llamar a la función updatePass
          if (email !== null) {
            updatePass(newPassword, email);
            toast.success("Contraseña reseteada con éxito.", { autoClose: 3000 });
            setTimeout(() => {
              window.location.href = "/"; 
            }, 1000);
          } else {
            toast.error("No se encontró el correo electrónico.", { autoClose: 3000 });
          }
        }
      };
      
  


  return (

      <div className='container-otpinput'>
        <div className='container-otpinput-2'>
          <div className='container-otpinput-3'>
            <div className='container-otpinput-4'>
              <div className='container-otpinput-5'>
                <p className='verification-otp'>Cambiar Contraseña</p>
              </div>
            </div>

            <div className='otpform'>         
                <div className='container-otpform'>
                  <div className='container-otpform-2'> 
                    <div className='form__group field'>
                      <input
                        className='form__field'
                        type="password"
                        value={passwords.newPassword}
                        onChange={(e) => handlePasswordChange(e, 'newPassword')}
                        placeholder="Nueva contraseña"
                      />
                      <label 
                        htmlFor="name" 
                        className='form__label'
                        > Nueva contraseña
                      </label>
                    </div>

                    <div className='container-pass-2'>
                        <div className='form__group field'>
                        <input
                            className='form__field'
                            type="password"
                            value={passwords.confirmPassword}
                            onChange={(e) => handlePasswordChange(e, 'confirmPassword')}
                            placeholder="Confirmar contraseña"
                        />
                        <label 
                            htmlFor="name" 
                            className='form__label'
                            > Confirmar contraseña
                        </label>
                        </div>
                    </div>
                    
                    <div className='container-verifyotp'>
                      <div>
                        <button 
                        onClick={handleResetPassword}
                          className='button-verifiOtp'
                        >
                          Resetear Contraseña
                        </button>
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