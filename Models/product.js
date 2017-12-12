'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    price: {
      type: DataTypes.NUMERIC(10, 2),
      allowNull: false,
    },
  });

  Product.associate = (models) => {
    // We presume if there is no category for products, products keep exist.
    // That's why we skip on delete cascade.
    Product.belongsTo(models.Category, {
      foreignKey: 'id',
      as: 'category'
    });
  };

  return Product;
};