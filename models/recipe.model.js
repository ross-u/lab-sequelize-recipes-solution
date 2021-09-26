const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      title: { type: Sequelize.STRING, allowNull: false, unique: true },
      level: {
        type: Sequelize.ENUM(["Easy Peasy", "Amateur Chef", "UltraPro Chef"]),
      },
      ingredients: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      cuisine: { type: Sequelize.STRING, allowNull: false },
      dishType: {
        type: Sequelize.ENUM([
          "breakfast",
          "main_course",
          "soup",
          "snack",
          "drink",
          "dessert",
          "other",
        ]),
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: "https://images.media-allrecipes.com/images/75131.jpg",
      },
      duration: { type: Sequelize.INTEGER, allowNull: false, min: 0 },
      creator: { type: Sequelize.STRING, notEmpty: true },
      created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    },
    {
      /* options */
    }
  );

  return Product;
};

/* 
title - Type String. It should be required and unique.
level - Type String. Can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the enum validator 😉).
ingredients - Type Array of Strings (represented as [ String ]).
cuisine - Type String. Should be required.
dishType - Type String. Possible values: breakfast, main_course, soup, snack, drink, dessert or other.
image - Type String. Default value: "https://images.media-allrecipes.com/images/75131.jpg".
duration - Type Number. The minimum value should be 0.
creator - Type String.
created - Type Date. By default, today.
*/
