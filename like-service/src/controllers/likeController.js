const likeModel = require('../models/likeModel');
const db = require('../../../config/db/init');

function likePost(req, res) {
  const postId = req.params.id;
  const userId = req.userId;

  db.get(`SELECT * FROM Like WHERE User_Id = ? AND Post_Id = ? AND Comment_Id IS NULL`, [userId, postId], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ error: 'User has already liked this post' });
    }

    likeModel.likePost(userId, postId, function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      db.run(`UPDATE Discuss SET Likes_Count = Likes_Count + 1 WHERE Post_Id = ?`, [postId], function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.json({ liked: this.changes });
      });
    });
  });
}

function unlikePost(req, res) {
  const postId = req.params.id;
  const userId = req.userId;

  db.get(`SELECT * FROM Like WHERE User_Id = ? AND Post_Id = ? AND Comment_Id IS NULL`, [userId, postId], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!row) {
      return res.status(400).json({ error: 'User has not liked this post' });
    }

    likeModel.unlikePost(userId, postId, function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      db.run(`UPDATE Discuss SET Likes_Count = Likes_Count - 1 WHERE Post_Id = ?`, [postId], function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.json({ unliked: this.changes });
      });
    });
  });
}

function likeComment(req, res) {
  const commentId = req.params.id;
  const userId = req.userId;

  db.get(`SELECT * FROM Like WHERE User_Id = ? AND Comment_Id = ? AND Post_Id IS NULL`, [userId, commentId], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ error: 'User has already liked this comment' });
    }

    likeModel.likeComment(userId, commentId, function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      db.run(`UPDATE Comment SET Likes_Count = Likes_Count + 1 WHERE Comment_Id = ?`, [commentId], function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.json({ liked: this.changes });
      });
    });
  });
}

function unlikeComment(req, res) {
  const commentId = req.params.id;
  const userId = req.userId;

  db.get(`SELECT * FROM Like WHERE User_Id = ? AND Comment_Id = ? AND Post_Id IS NULL`, [userId, commentId], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!row) {
      return res.status(400).json({ error: 'User has not liked this comment' });
    }

    likeModel.unlikeComment(userId, commentId, function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      db.run(`UPDATE Comment SET Likes_Count = Likes_Count - 1 WHERE Comment_Id = ?`, [commentId], function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.json({ unliked: this.changes });
      });
    });
  });
}

module.exports = { likePost, unlikePost, likeComment, unlikeComment };
