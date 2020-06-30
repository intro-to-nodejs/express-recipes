const fs = require('fs').promises;
const path = require('path');
const recipesFilePath = path.join(__dirname, './recipes.json');

const remove = async id => {
  const data = await fs.readFile(recipesFilePath);
  const recipes = JSON.parse(data);
  const recipe = recipes.find(recipe => recipe.id === id);

  if (!recipe) {
    const err = new Error('Recipe not found');
    err.status = 404;
    throw err;
  }

  const newRecipes = recipes
    .map(recipe => {
      return recipe.id === id ? null : recipe;
    })
    .filter(recipe => recipe !== null);

  await fs.writeFile(recipesFilePath, JSON.stringify(newRecipes));
};

const getAll = async () => {
  const data = await fs.readFile(recipesFilePath);
  return JSON.parse(data);
};

const get = async id => {
  const data = await fs.readFile(recipesFilePath);
  const recipes = JSON.parse(data);

  const recipe = recipes.find(recipe => recipe.id === id);

  if (!recipe) {
    const err = new Error('Recipe not found');
    err.status = 404;
    throw err;
  }

  return recipe;
};

const save = async content => {
  const data = await fs.readFile(recipesFilePath);
  const recipes = JSON.parse(data);

  const newRecipe = {
    id: recipes.length + 1,
    ...content,
  };

  recipes.push(newRecipe);

  await fs.writeFile(recipesFilePath, JSON.stringify(recipes));

  return newRecipe;
};

const update = async ({ id, content }) => {
  const data = await fs.readFile(recipesFilePath);
  const recipes = JSON.parse(data);
  const recipe = recipes.find(recipe => recipe.id === id);

  if (!recipe) {
    const err = new Error('Recipe not found');
    err.status = 404;
    throw err;
  }

  const updatedRecipe = {
    id,
    ...content,
  };

  const updatedRecipes = recipes.map(recipe => {
    return recipe.id === id ? updatedRecipe : recipe;
  });

  await fs.writeFile(recipesFilePath, JSON.stringify(updatedRecipes));

  return updatedRecipe;
};

module.exports = {
  getAll,
  get,
  remove,
  save,
  update,
};
