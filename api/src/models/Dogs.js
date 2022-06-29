const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dogs', {
    dog_id: {
      // type: DataTypes.UUID,
      // defaultValue: DataTypes.UUIDV4,
      type: DataTypes.INTEGER,
      autoincrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /\p{L}/gi, // valida que sean solo letras
        msg: "Nombre de raza no válido"
      }
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    initialAutoIncrement: 265, // total breeds from dogs API
  });
};
