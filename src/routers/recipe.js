const express = require('express');
const router = express.Router();

const {
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  saveRecipe,
  updateRecipe,
} = require('../controllers/recipe');

router.get('/', getAllRecipes);
router.post('/', saveRecipe);
router.get('/:id', getRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
