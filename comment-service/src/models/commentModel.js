const db = require('../../../config/db/init');

function createComment(Comment_Id, Post_Id, Parent_Comment_Id, Comment, callback) {
  db.run(`INSERT INTO Comment (Comment_Id, Post_Id, Parent_Comment_Id, Comment, Likes_Count) VALUES (?, ?, ?, ?, 0)`, [Comment_Id, Post_Id, Parent_Comment_Id, Comment], callback);
}

function getCommentById(commentId, callback) {
  db.get(`SELECT * FROM Comment WHERE Comment_Id = ?`, [commentId], callback);
}

function updateComment(commentId, Comment, callback) {
  db.run(`UPDATE Comment SET Comment = ? WHERE Comment_Id = ?`, [Comment, commentId], callback);
}

function deleteComment(commentId, callback) {
  db.run(`DELETE FROM Comment WHERE Comment_Id = ?`, [commentId], callback);
}

function getAllCommentsForPost(postId, callback) {
  db.all(`SELECT * FROM Comment WHERE Post_Id = ?`, [postId], callback);
}

module.exports = { createComment, getCommentById, updateComment, deleteComment, getAllCommentsForPost };
