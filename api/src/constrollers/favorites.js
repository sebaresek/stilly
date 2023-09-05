require("dotenv").config(); // process.env
const { User, Clothing, Favorite } = require("../db");

const postFav = async (req, res) => {
    const { userId, clothingId } = req.params;

    try {
        // Crear el registro de favorito en la tabla intermedia
        const user = await User.findByPk(userId);
        const clothing = await Clothing.findByPk(clothingId);

        if (!user || !clothing) {
            return res.status(404).json({ error: "Usuario o prenda no encontrados" });
        }

        await user.addClothing(clothing);

        return res.status(201).json({ message: "Prenda agregada a favoritos" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
    }
};

const deleteFav = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ message: 'ID no proporcionado' });
        }

        const favorite = await Favorite.findByPk(id);
        if (!favorite) {
            return res.status(404).json({ message: 'Favorito no encontrado' });
        }

        await Favorite.destroy({ where: { id } });
        
        const updatedFavorites = await Favorite.findAll();
        return res.status(200).json(updatedFavorites);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
};



module.exports = {
  postFav,
  deleteFav,
};
