'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Request.init({
    requestType: DataTypes.STRING,
    holderID: DataTypes.STRING,
    issuerID: DataTypes.STRING,
    data: DataTypes.TEXT,
    link: DataTypes.TEXT,
    isdone: DataTypes.STRING,
    claimID: DataTypes.STRING,
    holderDID: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};