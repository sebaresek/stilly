const validation = (userData) => {
    const errors = {};
  
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)) {
      errors.email = 'el email ingresado no es válido';
    }
    if (!userData.email) {
      errors.email = 'debe ingresar un email';
    } else if (userData.email.length > 35) {
      errors.email = 'el email no debe superar los 35 caracteres';
    }
  
    if (!/.*\d+.*/.test(userData.password)) {
      errors.password = 'la contraseña debe contener al menos un número';
    }
    if (userData.password.length < 6) {
      errors.password = 'la contraseña debe tener al menos 6 caracteres';
    }
  
    if (!userData.firstName) {
      errors.firstName = 'debe ingresar un Nombre';
    } else if (userData.firstName.length > 15) {
      errors.firstName = 'el nombre no debe superar los 15 caracteres';
    }
  
    if (!userData.lastName) {
      errors.lastName = 'debe ingresar un Apellido';
    } else if (userData.lastName.length > 15) {
      errors.lastName = 'el apellido no debe superar los 15 caracteres';
    }
  
    if (!userData.address) {
      errors.address = 'debe ingresar una dirección';
    }
  
    if (!userData.city) {
      errors.city = 'debe ingresar una provincia';
    }
  
    if (!userData.postalCode) {
      errors.postalCode = 'debe ingresar un código postal';
    }
  
    if (!userData.phoneNumber) {
      errors.phoneNumber = 'debe ingresar un número de celular';
    } else if (!/^\d{10}$/.test(userData.phoneNumber)) {
      errors.phoneNumber = 'debe ingresar un número de celular válido';
    }
  
    return errors;
  };
  
  export default validation;
  