const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('temperaments', {
        temperament_id: {
            // type: Sequelize.UUID,
            // defaultValue: Sequelize.UUIDV4,
            type: Sequelize.INTEGER,
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
                msg: "Nombre de temperamento no válido"
            }
        }
    }, {
        timestamps: false
    });
  };