const commentModel = require('../models/commentModel');

function createComment(req, res) {
  const { Post_Id, Parent_Comment_Id, Comment } = req.body;
  const Comment_Id = `comment${Date.now()}`;
  commentModel.createComment(Comment_Id, Post_Id, Parent_Comment_Id, Comment, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ Comment_Id });
  });
}

function getComment(req, res) {
  const commentId = req.params.id;
  commentModel.getCommentById(commentId, (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(row);
  });
}

function updateComment(req, res) {
  const commentId = req.params.id;
  const { Comment } = req.body;
  commentModel.updateComment(commentId, Comment, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ updated: this.changes });
  });
}

function deleteComment(req, res) {
  const commentId = req.params.id;
  commentModel.deleteComment(commentId, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ deleted: this.changes });
  });
}

function getAllCommentsForPost(req, res) {
  const postId = req.query.postId;
  commentModel.getAllCommentsForPost(postId, (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
}

module.exports = { createComment, getComment, updateComment, deleteComment, getAllCommentsForPost };
