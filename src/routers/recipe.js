const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const auth = require('../middleware/auth');

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

router.post('/', auth.authenticate(), async (req, res, next) => {
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

router.put('/:id', auth.authenticate(), async (req, res, next) => {
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

    const updatedRecipe = {
      ...req.body,
    };

    const updatedRecipes = recipes.map(recipe => {
      return recipe.id === parseInt(req.params.id) ? updatedRecipe : recipe;
    });

    await fs.writeFile(recipesFilePath, JSON.stringify(updatedRecipes));

    res.json(updatedRecipe);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', auth.authenticate(), async (req, res, next) => {
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

    const newRecipes = recipes
      .map(recipe => {
        return recipe.id === parseInt(req.params.id) ? null : recipe;
      })
      .filter(recipe => recipe !== null);

    await fs.writeFile(recipesFilePath, JSON.stringify(newRecipes));
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
