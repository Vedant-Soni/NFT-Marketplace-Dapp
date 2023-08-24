'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nftdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nftdetail.init(
    {
      tokenId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      attributes: DataTypes.JSON,
      metadata: DataTypes.JSON,
      owner: DataTypes.STRING,
      isListed: DataTypes.BOOLEAN,
      price: DataTypes.DECIMAL(38, 18),
    },
    {
      sequelize,
      modelName: 'nftdetail',
    },
  );
  return nftdetail;
};
