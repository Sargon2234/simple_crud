'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    classMethods: {
      associate: function (models) {
        Category.hasMany(models.Product, {
          foreignKey: 'category_id',
        });
      },
    },
  });
  return Category;
};