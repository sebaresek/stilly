const { Clothing } = require('../db')

const getClothing = async (req, res) => {
    const {name} = req.query;
    try {
        if (!name) {
            return res.status(400).json({ error: "Debe proporcionar un parametro de busqueda!" });
        }
        const results = await Clothing.findAll({ where: { name } })
        res.status(200).json(results)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
}

const getClothings = async (req, res) => {
    try {
        const allClothing = await Clothing.findAll() 
        res.status(200).json(allClothing)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


const createClothing = async (req, res) => {
    const { name, category, price, waist, color, sleeve, image  } = req.body; 
    try {  
      if (!name || !category || !image || !price || !waist || !color || !sleeve) {
        return res.status(400).json({ error: "Faltan campos obligatorios!" });
      }
      const newClothing = await Clothing.create({ name, category, price, waist, color, sleeve, image });
      res.status(201).json(newClothing);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
};


const deletedClothing = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Clothing.destroy({ where: { id } });
      res.status(200).json({ message: deleted });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el Pokémon' });
    }
  };

  module.exports = {
    getClothings,
    createClothing,
    deletedClothing,
    getClothing
  }