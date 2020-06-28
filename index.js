const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Express Recipes!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
