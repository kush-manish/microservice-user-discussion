const db = require('../../../config/db/init');

function createUser(User_Id, Email, Mobile_No, Name, callback) {
  db.run(`INSERT INTO User (User_Id, Email, Mobile_No, Name) VALUES (?, ?, ?, ?)`, [User_Id, Email, Mobile_No, Name], callback);
}

function getUserById(userId, callback) {
  db.get(`SELECT * FROM User WHERE User_Id = ?`, [userId], callback);
}

function updateUser(userId, Email, Mobile_No, Name, callback) {
  db.run(`UPDATE User SET Email = ?, Mobile_No = ?, Name = ? WHERE User_Id = ?`, [Email, Mobile_No, Name, userId], callback);
}

function deleteUser(userId, callback) {
  db.run(`DELETE FROM User WHERE User_Id = ?`, [userId], callback);
}

function getAllUsers(callback) {
  db.all(`SELECT * FROM User`, [], callback);
}

function getUserByCredentials(User_Id, Email, Mobile_No, callback) {
  db.get(`SELECT * FROM User WHERE User_Id = ? AND Email = ? AND Mobile_No = ?`, [User_Id, Email, Mobile_No], callback);
}

function getUsersByName(name, callback) {
  db.all(`SELECT * FROM User WHERE Name LIKE ?`, [`%${name}%`], callback);
}

module.exports = { getUsersByName,createUser, getUserById, updateUser, deleteUser, getAllUsers, getUserByCredentials };
