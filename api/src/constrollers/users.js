const { User } = require("../db");

const postUser = async (req, res) => {
    const {
        id,
        email,
        password,
        firstName,
        lastName,
        address,
        city,
        postalCode,
        phoneNumber
    } = req.body;

    if (!email || !password || !firstName || !lastName || !address || !city || !postalCode || !phoneNumber) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    try {
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                email,
                password,
                firstName,
                lastName,
                address,
                city,
                postalCode,
                phoneNumber
            },
        });

        if (created) {
            return res.status(200).json(user);
        } else {
            return res.status(400).json({ error: 'Ese usuario ya existe' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
};


const getUser = async (req, res) =>{
    try {
      const { email } = req.params;

       // Buscar al usuario por su dirección de correo electrónico
       const user = await User.findOne({ where: { email } });
  
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
  
        return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Error al buscar el usuario' });
    }
}


const updateUser = async (req, res) => {
    
    try {
      const { 
        userId, 
        newFirstName, 
        newLastName, 
        newEmail,
        newCity,
        newAddress,
        newPostalCode,
        newPhoneNumber,
      } = req.params;
  
      // Buscar al usuario por su identificador único
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Actualizar solo los campos proporcionados en la solicitud
      if (newFirstName) {
        user.firstName = newFirstName;
      }
  
      if (newLastName) {
        user.lastName = newLastName;
      }
  
      if (newEmail) {
        user.email = newEmail;
      }
  
      if (newCity) {
        user.city = newCity;
      }
  
      if (newAddress) {
        user.address = newAddress;
      }
  
      if (newPostalCode) {
        user.postalCode = newPostalCode;
      }
  
      if (newPhoneNumber) {
        user.phoneNumber = newPhoneNumber;
      }
  
      // Actualizar el usuario
      await user.save();
  
      return res.status(200).json({ message: 'Dato actualizado exitosamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar el dato requerido' });
    }
};
  






module.exports = {
    postUser,
    getUser,
    updateUser
};
