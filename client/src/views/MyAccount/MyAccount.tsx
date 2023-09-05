import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './MyAccount.css'

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    address: string;
    postalCode: string;
    phoneNumber: string;
    id: number;
}

export const MyAccount = () => {
    const navigate = useNavigate()
    const email = localStorage.getItem('userEmail');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [isEditingName, setIsEditingName] = useState(false); 
    const [isEditingLastName, setIsEditingLastName] = useState(false); 
    const [isEditingEmail, setIsEditingEmail] = useState(false); 
    const [isEditingCity, setIsEditingCity] = useState(false); 
    const [isEditingAddress, setIsEditingAddress] = useState(false); 
    const [isEditingPostalCode, setIsEditingPostalCode] = useState(false); 
    const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false); 
    const [userData, setUserData] = useState<UserData | null>();
    

    const fetchUserData = () => {
        if (email) {
            axios.get(`http://localhost:3001/user/${email}`)
                .then(response => {
                    console.log(response.data)
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error('Error:', error.response ? error.response.data.error : error.message);
                });
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleshops = () => {
        navigate('/shops')
    }


    const handleEditName = () => {
        setIsEditingName(true); 
    };

    const handleEditLastName = () => {
        setIsEditingLastName(true); 
    };

    const handleEditEmail = () => {
        setIsEditingEmail(true); 
    };

    const handleEditCity = () => {
        setIsEditingCity(true); 
    };

    const handleEditAddress = () => {
        setIsEditingAddress(true); 
    };

    const handleEditPostalCode = () => {
        setIsEditingPostalCode(true); 
    };

    const handleEditPhoneNumber = () => {
        setIsEditingPhoneNumber(true); 
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailRegex.test(email)) {
            setEmailError('El correo electrónico no es válido');
        } else {
            setEmailError(null);
        }
    };

    // Manejar cambios en el campo de correo electrónico
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setUserData((prevUserData) => {
            if (prevUserData) {
                return {
                    ...prevUserData,
                    email: newEmail,
                };
            } else {
                return null; // Manejar el caso de null si es necesario
            }
        });
        validateEmail(newEmail);
    };


    const validatePhone = (phoneNumber: string) => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setPhoneError('El número de celular no es válido');
        } else {
            setPhoneError(null);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhone = e.target.value;
        setUserData((prevUserData) => {
            if (prevUserData) {
                return {
                    ...prevUserData,
                    phoneNumber: newPhone,
                };
            } else {
                return null; // Manejar el caso de null si es necesario
            }
        });
        validatePhone(newPhone);
    };
    
    


    const handleSaveClick = () => {
        if (userData) {

            if (emailError) {
                // No guardar si hay un error en el correo electrónico
                toast.error('Por favor, corrige el correo electrónico antes de guardar.', { autoClose: 3000 });
                return;
            }

            if(phoneError){
                toast.error('Por favor, corrige el número celular antes de guardar.', { autoClose: 3000 });
                return;
            }

            axios.put(`http://localhost:3001/user/${userData.id}/${userData.firstName}/${userData.lastName}/${userData.email}/${userData.city}/${userData.address}/${userData.postalCode}/${userData.phoneNumber}`)
            .then(response => {
                toast.success('Tus datos fueron actualizados correctamente.', { autoClose: 3000 });
                console.log(response.data.message);
                 // Verificar si el campo de correo electrónico se ha modificado
                if (userData.email !== localStorage.getItem('userEmail')) {
                    localStorage.setItem('userEmail', userData.email);
                }
            })
            .catch(error => {
                toast.error('No pudimos procesar la sulicitud. Intente mas tarde por favor.', { autoClose: 3000 })
                console.error('Error:', error.response ? error.response.data.error : error.message);
            });
            setIsEditingLastName(false);
            setIsEditingEmail(false);
            setIsEditingCity(false);
            setIsEditingAddress(false);
            setIsEditingPostalCode(false);
            setIsEditingPhoneNumber(false);
            setIsEditingName(false); 
        }
    };


    return (
        <div className='container-micuenta'>
            <div className='container-micuenta-2'>
                <h2 className='h2-micuenta'>Datos de tu cuenta</h2>
                {userData ? (
                    <div className='container-micuenta-3'>
                        <div className='container-micuenta-divs'>
                            <p className='micuenta-p'>Nombre:
                                {isEditingName ? (
                                <>
                                    <input
                                    className='micuenta-input'
                                    type='text'
                                    value={userData.firstName}
                                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                    />
                                    <button className='button-micuenta' onClick={handleSaveClick}>
                                    Guardar
                                    </button>
                                </>
                                ) : (
                                <>
                                    <span className='micuenta-span'>
                                    {userData.firstName}
                                    </span>
                                    <button
                                    className='button-micuenta'
                                    onClick={handleEditName}
                                    > Modificar
                                    </button>
                                </>
                                )}
                            </p>
                        </div>

                        <div className='container-micuenta-divs'>
                            <p className='micuenta-p'>Apellido:
                                {isEditingLastName ? (
                                <>
                                    <input
                                    className='micuenta-input'
                                    type='text'
                                    value={userData.lastName}
                                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                    />
                                    <button className='button-micuenta' onClick={handleSaveClick}>
                                    Guardar
                                    </button>
                                </>
                                ) : (
                                <>
                                    <span className='micuenta-span'>
                                    {userData.lastName}
                                    </span>
                                    <button
                                    className='button-micuenta'
                                    onClick={handleEditLastName}
                                    > Modificar
                                    </button>
                                </>
                                )}
                            </p>
                        </div>

                        <div className='container-micuenta-divs'>
                            <p className='micuenta-p'>Email:
                                {isEditingEmail ? (
                                <>
                                    <input
                                    className={`micuenta-input ${emailError ? 'input-error' : ''}`}
                                    type='text'
                                    value={userData.email}
                                    onChange={handleEmailChange} // Usar la función de manejo de cambios
                                    />
                                    {emailError && <span className='error-message-micuenta'>{emailError}</span>}
                                    <button className='button-micuenta' onClick={handleSaveClick}>
                                    Guardar
                                    </button>
                                </>
                                ) : (
                                <>
                                    <span className='micuenta-span'>
                                    {userData.email}
                                    </span>
                                    <button
                                    className='button-micuenta'
                                    onClick={handleEditEmail}
                                    > Modificar
                                    </button>
                                </>
                                )}
                            </p>
                        </div>

                        <div className='container-micuenta-divs'>
                            <p className='micuenta-p'>Dirección:
                                {isEditingAddress ? (
                                <>
                                    <input
                                    className='micuenta-input'
                                    type='text'
                                    value={userData.address}
                                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                    />
                                    <button className='button-micuenta' onClick={handleSaveClick}>
                                    Guardar
                                    </button>
                                </>
                                ) : (
                                <>
                                    <span className='micuenta-span'>
                                    {userData.address}
                                    </span>
                                    <button
                                    className='button-micuenta'
                                    onClick={handleEditAddress}
                                    > Modificar
                                    </button>
                                </>
                                )}
                              </p>
                            </div>

                            <div className='container-micuenta-divs'>
                                <p className='micuenta-p'>Ciudad:
                                    {isEditingCity ? (
                                    <>
                                        <input
                                        className='micuenta-input'
                                        type='text'
                                        value={userData.city}
                                        onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                                        />
                                        <button className='button-micuenta' onClick={handleSaveClick}>
                                        Guardar
                                        </button>
                                    </>
                                    ) : (
                                    <>
                                        <span className='micuenta-span'>
                                        {userData.city}
                                        </span>
                                        <button
                                        className='button-micuenta'
                                        onClick={handleEditCity}
                                        > Modificar
                                        </button>
                                    </>
                                    )}
                                </p>
                            </div>

                            <div className='container-micuenta-divs'>
                                <p className='micuenta-p'>Código Postal:
                                    {isEditingPostalCode ? (
                                    <>
                                        <input
                                        className='micuenta-input'
                                        type='text'
                                        value={userData.postalCode}
                                        onChange={(e) => setUserData({ ...userData, postalCode: e.target.value })}
                                        />
                                        <button className='button-micuenta' onClick={handleSaveClick}>
                                        Guardar
                                        </button>
                                    </>
                                    ) : (
                                    <>
                                        <span className='micuenta-span'>
                                        {userData.postalCode}
                                        </span>
                                        <button
                                        className='button-micuenta'
                                        onClick={handleEditPostalCode}
                                        > Modificar
                                        </button>
                                    </>
                                    )}
                                </p>
                            </div>

                            <div className='container-micuenta-divs'>
                                <p className='micuenta-p'>Teléfono:
                                    {isEditingPhoneNumber ? (
                                    <>
                                        <input
                                        className='micuenta-input'
                                        type='text'
                                        value={userData.phoneNumber}
                                        onChange={handlePhoneChange}
                                        />
                                        {phoneError && <span className='error-message-micuenta'>{phoneError}</span>}
                                        <button className='button-micuenta' onClick={handleSaveClick}>
                                        Guardar
                                        </button>
                                    </>
                                    ) : (
                                    <>
                                        <span className='micuenta-span'>
                                        {userData.phoneNumber}
                                        </span>
                                        <button
                                        className='button-micuenta'
                                        onClick={handleEditPhoneNumber}
                                        > Modificar
                                        </button>
                                    </>
                                    )}
                                </p>
                            </div>

                            <div className='container-micuenta-divs'>
                                <p className='micuenta-p'>Mis Compras:
                                    <button
                                        className='button-micuenta-flecha'
                                        onClick={handleshops}
                                    > &#10095;
                                    </button>
                                </p>

                            </div>

                    </div>
                ) : (
                    <p>Cargando datos...</p>
                )}
            </div>   
            <ToastContainer />
        </div>
    );
};
