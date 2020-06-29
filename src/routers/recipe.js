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

module.exports = router;
