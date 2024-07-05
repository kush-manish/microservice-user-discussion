const { generateToken } = require('../utils/jwt');
const userModel = require('../models/userModel');

function createUser(req, res) {
  const { Email, Mobile_No, Name } = req.body;
  const User_Id = `user${Date.now()}`;
  userModel.createUser(User_Id, Email, Mobile_No, Name, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const { token, expiresIn } = generateToken(User_Id);
    res.json({ User_Id, token, expiresIn });
  });
}

function getUser(req, res) {
  const userId = req.params.id;
  userModel.getUserById(userId, (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(row);
  });
}

function updateUser(req, res) {
  const userId = req.params.id;
  const { Email, Mobile_No, Name } = req.body;
  userModel.updateUser(userId, Email, Mobile_No, Name, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ updated: this.changes });
  });
}

function deleteUser(req, res) {
  const userId = req.params.id;
  userModel.deleteUser(userId, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ deleted: this.changes });
  });
}

function getAllUsers(req, res) {
  userModel.getAllUsers((err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
}

function getToken(req, res) {
  const { User_Id, Email, Mobile_No } = req.body;
  userModel.getUserByCredentials(User_Id, Email, Mobile_No, (err, row) => {
    if (err || !row) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const { token, expiresIn } = generateToken(User_Id);
    res.json({ token, expiresIn });
  });
}

function searchUsersByName(req, res) {
  const { name } = req.query;
  userModel.getUsersByName(name, (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
}


module.exports = { searchUsersByName,createUser, getUser, updateUser, deleteUser, getAllUsers, getToken };
