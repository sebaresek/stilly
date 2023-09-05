const { DataTypes } = require('sequelize');

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
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
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
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{ timestamps: false });
};