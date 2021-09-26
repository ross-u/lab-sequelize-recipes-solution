const { sequelize, Recipe } = require("./db");
const recipesData = require("./data.json");

sequelize
  .authenticate()
  .then(() => console.log("Connected to the DB."))
  .then(() => sequelize.sync({ force: true }))
  .then(() => {
    return Recipe.create({
      title: "Pasta rigatoni",
      level: "Amateur Chef",
      ingredients: ["pasta", "olive oil", "basil", "cheese"],
      cuisine: "italian",
      dishType: "main_course",
      image: "test-this-example",
      duration: 30,
      creator: "Ana",
    });
  })
  .then((createdRecipe) =>
    console.log("createdRecipe", JSON.stringify(createdRecipe, null, 4))
  )
  .then(() => Recipe.bulkCreate(recipesData))
  .then((createdRecipes) => {
    createdRecipes.forEach((recipe) => {
      console.log(`- ${recipe.title}`);
    });
  })
  .then(() => {
    return Recipe.update(
      { duration: 100 },
      {
        where: { title: "Rigatoni alla Genovese" },
        returning: true,
      }
    );
  })
  .then((updatedRecipe) =>
    console.log("\nupdatedRecipe", JSON.stringify(updatedRecipe, null, 4))
  )
  .then(() => Recipe.destroy({ where: { title: "Carrot Cake" } }))
  .then((deletionStatus) => console.log(`deletionStatus`, deletionStatus))
  .then(() => sequelize.close())
  .then(() => console.log("DB connection closed!"))
  .catch((err) => console.error("Something went wrong:", err));
