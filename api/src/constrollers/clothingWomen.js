const { Clothing } = require('../db')
const Sequelize = require('sequelize');
const { Op, where } = require('sequelize');



const getTShirtAndMuscleWomen = async (req, res) => {
    try {
      const allTShirtAndMuscle = await Clothing.findAll({
        where: {
          [Op.or]: [
            { 
              [Op.and]: [
                { category: 'remeras' },
                {
                  [Op.or]: [
                    { gender: 'femenino' },
                    { gender: 'unisex' },
                  ],
                },
              ],
            },
            { 
              [Op.and]: [
                { category: 'musculosas' },
                {
                  [Op.or]: [
                    { gender: 'femenino' },
                    { gender: 'unisex' },
                  ],
                },
              ],
            },
          ],
        },
      });
      res.status(200).json(allTShirtAndMuscle);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }


  
const getshortsAndpantsWomen = async (req, res) => {
  try {
    const allTshortsAndpants = await Clothing.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { category: 'shorts' },
              {
                [Op.or]: [
                  { gender: 'femenino' },
                  { gender: 'unisex' },
                ],
              },
            ],
          },
          {
            [Op.and]: [
              { category: 'pantalones' },
              {
                [Op.or]: [
                  { gender: 'femenino' },
                  { gender: 'unisex' },
                ],
              },
            ],
          },
        ],
      },
    });
    res.status(200).json(allTshortsAndpants);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}



const getDiversAndJacketsWomen = async (req, res) => {
    try {
      const allDiversAndJackets = await Clothing.findAll({
        where: {
          [Op.or]: [
            {
              [Op.and]: [
                { category: 'buzos' },
                {
                  [Op.or]: [
                    { gender: 'femenino' },
                    { gender: 'unisex' },
                  ],
                },
              ],
            },
            {
              [Op.and]: [
                { category: 'camperas' },
                {
                  [Op.or]: [
                    { gender: 'femenino' },
                    { gender: 'unisex' },
                  ],
                },
              ],
            },
          ],
        },
      });
      res.status(200).json(allDiversAndJackets);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  


  
const getAccessoriesWomen = async (req, res) => {
    try {
      const allClothingByAccessories = await Clothing.findAll({
        where: {
          [Op.or]: [
            {
              [Op.and]: [
                { category: 'medias' },
                {
                  [Op.or]: [
                    { gender: 'femenino' },
                    { gender: 'unisex' },
                  ],
                },
              ],
            },
            {
              [Op.and]: [
                { category: 'gorras' },
                {
                  [Op.or]: [
                    { gender: 'femenino' },
                    { gender: 'unisex' },
                  ],
                },
              ],
            },
            {
              [Op.and]: [
                { category: 'pilusos' },
                {
                  [Op.or]: [
                    { gender: 'femenino' },
                    { gender: 'unisex' },
                  ],
                },
              ],
            },
          ],
        },
      });
      res.status(200).json(allClothingByAccessories);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).json({ error: 'Error al obtener datos' });
    }
  };
  

  module.exports = {
    getTShirtAndMuscleWomen, 
    getshortsAndpantsWomen,
    getDiversAndJacketsWomen, 
    getAccessoriesWomen
  }