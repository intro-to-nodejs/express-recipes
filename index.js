const express = require('express');
const path = require('path');

const app = express();

/**
  MIDDLEWARE
*/
const publicDirectoryPath = path.join(__dirname, './public');
app.use(express.static(publicDirectoryPath));

/*
  ROUTE HANDLERS
*/
app.get('/:name', (req, res) => {
  res.send(`Welcome to Express Recipes, ${req.params.name}!`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
