'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EducationUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EducationUser.init({
    educationID: DataTypes.STRING,
    userID: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'EducationUser',
  });
  return EducationUser;
};