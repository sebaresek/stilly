const { User } = require("../db");
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    try {
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Comparar la contraseña ingresada con la contraseña almacenada utilizando bcrypt
        // Esto asegura que las contraseñas no se almacenen en texto plano.
        // const isPasswordMatch = await bcrypt.compare(password, user.password);
        // if (isPasswordMatch) {
        //     return res.status(200).json({ access: true });
        // } else {
        //     return res.status(403).json({ error: "Credenciales inválidas" });
        // }
        
        if (user.password === password) {
            return res.status(200).json({ access: true });
        } else {
            return res.status(403).json({ error: "Credenciales inválidas" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
    }
};

module.exports = {
    login
};

// Utilizando técnicas de hash, como bcrypt, las contraseñas se transforman en una cadena de caracteres enmascarada e irreversible. Esto significa que incluso si alguien obtiene acceso a la base de datos, no podrán descifrar las contraseñas originales. Cuando un usuario intenta iniciar sesión, la contraseña ingresada se compara con el hash almacenado en la base de datos, y si coinciden, se otorga el acceso.