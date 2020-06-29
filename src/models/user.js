const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const path = require('path');

const config = require('../config/');
const usersFilePath = path.join(__dirname, '../users.json');

const authenticateUser = async ({ id, email, password }) => {
  const user = await findUser({ email });
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!user || !isPasswordValid) {
    throw new Error('Unable to login');
  }

  const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
    expiresIn: 36000,
  });

  user.tokens.push(token);
  const updatedUsers = users.map(existingUser => {
    return existingUser.email === req.body.email ? user : existingUser;
  });

  await fs.writeFile(usersFilePath, JSON.stringify(updatedUsers));

  return { token };
};

const createUser = async ({ email, name, password }) => {
  const data = await fs.readFile(usersFilePath);
  const users = JSON.parse(data);
  const user = await findUser({ email });

  if (user) {
    throw new Error('Email already exists!');
  }

  const newUser = {
    id: users.length + 1,
    email,
    name,
    password: await bcrypt.hash(password, 10),
    tokens: [],
  };

  const token = jwt.sign({ id: newUser.id }, config.JWT_SECRET, {
    expiresIn: 36000,
  });

  newUser.tokens.push(token);
  users.push(newUser);
  await fs.writeFile(usersFilePath, JSON.stringify(users));

  return { token };
};

const findUser = async ({ id, email }) => {
  const data = await fs.readFile(usersFilePath);
  const users = JSON.parse(data);

  const existingUser = users.find(
    user => user.id === id || user.email === email
  );

  return existingUser;
};

module.exports = {
  authenticateUser,
  createUser,
  findUser,
};
