const express = require('express');
const { authenticateUser, createUser } = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { token } = await createUser(req.body);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { token } = await authenticateUser(req.body);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
