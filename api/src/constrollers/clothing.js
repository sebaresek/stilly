const { Clothing } = require('../db')
const Sequelize = require('sequelize');
const { Op, where } = require('sequelize'); //operador or para bdd




const searchClothingByName = async (req, res) => {
  const { name } = req.query;
  try {
      if (!name) {
          return res.status(400).json({ error: "Debe proporcionar un parámetro de búsqueda." });
      }
      // Utiliza el operador $iLike o $ilike para realizar una búsqueda insensible a mayúsculas y minúsculas
      const results = await Clothing.findAll({
          where: {
              category: {
                  [Sequelize.Op.iLike]: `%${name}%` // Esto busca cualquier coincidencia dentro del nombre
              }
          }
      });
      console.log('Resultados de la búsqueda:', results);
      res.status(200).json(results);
  } catch (error) {
      return res.status(400).json({ error: error.message });
  }
}



const getClothingById = async (req, res) => {
  const { id } = req.params; 
  try {
    const clothing = await Clothing.findByPk(id);
    if (!clothing) {
      return res.status(404).json({ error: 'La ropa no se encontró' });
    }
    res.status(200).json(clothing);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};



const getClothings = async (req, res) => {
    try {
        const allClothing = await Clothing.findAll() 
        res.status(200).json(allClothing)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const getClothingOffer = async (req, res) => {
  try {
      const allClothingOffer = await Clothing.findAll({
        where : {
          offer: true
        }}
      ) 
      res.status(200).json(allClothingOffer)
  } catch (error) {
      return res.status(400).json({ error: error.message })
  }
}


const getClothingByMale = async (req, res) =>{
  try {
    const allClothingMaleOrUnisex = await Clothing.findAll({
      where: {
        [Op.or]: [
          { gender: 'masculino' },
          { gender: 'unisex' }
        ]
      }
    });
    res.status(200).json(allClothingMaleOrUnisex)
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}


const getClothingByFemale = async (req, res) => {
  try {
    const allClothingFemaleOrUnisex = await Clothing.findAll({
      where: {
        [Op.or]: [
          { gender: 'femenino' },
          { gender: 'unisex' }
        ]
      }
    });
    res.status(200).json(allClothingFemaleOrUnisex)
  } catch (error) {
      return res.status(400).json({error: error.message})
  }
}


const getClothingByaccessories = async (req, res) =>{
  try {
    const allClothingByAccessories = await Clothing.findAll({ 
      where: { 
        [Op.or]: [
          { category: 'medias' },
          { category: 'gorras' },
          { category: 'pilusos' },
          { category: 'boxers' },
        ]
      }
    });
    res.status(200).json(allClothingByAccessories)
  } catch (error) {
    
  }
}


const createClothing = async (req, res) => {
  const { name, category, gender, price, waist, color, sleeve, offer, description, image: imageUrls } = req.body;

  try {
    if (!name  || !description || !gender || !category || !price || !waist || !color || !sleeve || !imageUrls || imageUrls.length === 0) {
      return res.status(400).json({ error: 'Faltan campos obligatorios o imágenes.' });
    }
    // Concatenar las URL de las imágenes en una única cadena
    const concatenatedImageUrls = imageUrls.join(', ');
    // Crear el nuevo objeto de ropa con la cadena de URL de las imágenes
    const newClothing = await Clothing.create({
      name,
      description,
      gender,
      category,
      price,
      waist,
      color,
      sleeve,
      offer,
      image: concatenatedImageUrls, // Almacenar las URL de las imágenes como una cadena
    });
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
    getClothingByMale,
    getClothingByFemale,
    getClothingByaccessories,
    getClothingOffer,
    // todavia no ocupe estos 2
    searchClothingByName,
    getClothingById,
  }