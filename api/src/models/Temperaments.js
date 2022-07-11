const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('temperaments', {
        temperament_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            // type: DataTypes.INTEGER,
            // autoincrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g // /\p{L}/gi, // valida que sean solo letras y espacios
            //     msg: "Nombre de temperamento no válido"
            }
        }
    }, {
        timestamps: false
    });
  };