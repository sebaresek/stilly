const { DataTypes, Validator } = require('sequelize');


module.exports = (sequelize) => {
  const Clothing = sequelize.define('Clothing', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['masculino', 'femenino', 'unisex']],
          msg: 'El género debe ser "masculino", "femenino" o "unisex"',
        },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['remeras', 'musculosas', 'shorts', 'pantalones', 'buzos', 'camperas', 'medias', 'gorras', 'pilusos']],
          msg: 'La categoria debe ser "remeras", "musculosas", "shorts", "pantalones", "buzos", "camperas", "medias", "gorras", "pilusos" ',
        },
      },
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    waist: {  //talle
        type: DataTypes.STRING,
        allowNull:false
    },
    color: {
        type: DataTypes.STRING,
        allowNull:false
    },
    sleeve: { //manga
        type: DataTypes.STRING,
        allowNull:false
    },
    offer: { //oferta
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'El campo "oferta" debe ser true o false',
        },
      },
    },
    image: {
      type: DataTypes.TEXT,// Cambiar de STRING a TEXT
      allowNull: false
    }
  },{ timestamps: false });
};