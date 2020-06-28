const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Express Recipes!');
});

app.get('/:name', (req, res) => {
  res.send(`Welcome to Express Recipes, ${req.params.name}!`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
