const db = require('../../../config/db/init');

function followUser(followerId, followeeId, callback) {
  db.run(`INSERT INTO Follow (Follower_Id, Followee_Id) VALUES (?, ?)`, [followerId, followeeId], callback);
}

function unfollowUser(followerId, followeeId, callback) {
  db.run(`DELETE FROM Follow WHERE Follower_Id = ? AND Followee_Id = ?`, [followerId, followeeId], callback);
}

function getFollowers(userId, callback) {
  db.all(`SELECT User.* FROM Follow JOIN User ON Follow.Follower_Id = User.User_Id WHERE Followee_Id = ?`, [userId], callback);
}

function getFollowees(userId, callback) {
  db.all(`SELECT User.* FROM Follow JOIN User ON Follow.Followee_Id = User.User_Id WHERE Follower_Id = ?`, [userId], callback);
}

module.exports = { followUser, unfollowUser, getFollowers, getFollowees };
