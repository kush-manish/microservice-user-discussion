const db = require('../../../config/db/init');

function likePost(userId, postId, callback) {
  db.run(`INSERT INTO Like (User_Id, Post_Id, Comment_Id) VALUES (?, ?, NULL)`, [userId, postId], callback);
}

function unlikePost(userId, postId, callback) {
  db.run(`DELETE FROM Like WHERE User_Id = ? AND Post_Id = ? AND Comment_Id IS NULL`, [userId, postId], callback);
}

function likeComment(userId, commentId, callback) {
  db.run(`INSERT INTO Like (User_Id, Post_Id, Comment_Id) VALUES (?, NULL, ?)`, [userId, commentId], callback);
}

function unlikeComment(userId, commentId, callback) {
  db.run(`DELETE FROM Like WHERE User_Id = ? AND Comment_Id = ? AND Post_Id IS NULL`, [userId, commentId], callback);
}

module.exports = { likePost, unlikePost, likeComment, unlikeComment };
