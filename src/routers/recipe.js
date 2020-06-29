const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const recipesFilePath = path.join(__dirname, '../recipes.json');

router.get('/', async (req, res, next) => {
  try {
    const data = await fs.readFile(recipesFilePath);
    res.json(JSON.parse(data));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = await fs.readFile(recipesFilePath);
    const recipes = JSON.parse(data);

    const newRecipe = {
      id: recipes.length + 1,
      ...req.body,
    };

    recipes.push(newRecipe);

    await fs.writeFile(recipesFilePath, JSON.stringify(recipes));

    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await fs.readFile(recipesFilePath);
    const recipes = JSON.parse(data);

    const recipe = recipes.find(
      recipe => recipe.id === parseInt(req.params.id)
    );

    if (!recipe) {
      const err = new Error('Recipe not found');
      err.status = 404;
      throw err;
    }

    res.json(recipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
