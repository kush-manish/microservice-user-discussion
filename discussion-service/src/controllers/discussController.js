const discussModel = require('../models/discussModel');

function createDiscussPost(req, res) {
  const { Text, Image_Link, Tags } = req.body;
  const Post_Id = `post${Date.now()}`;
  const Created_On = new Date().toISOString();
  const User_Id = req.userId;
  discussModel.createDiscussPost(Post_Id, User_Id, Text, Image_Link, Tags, Created_On, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ Post_Id });
  });
}

function getDiscussPost(req, res) {
  const postId = req.params.id;
  discussModel.getDiscussPostById(postId, (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (row) {
      discussModel.incrementViewCount(postId, function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        row.View_Count += 1;
        res.json(row);
      });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  });
}

function updateDiscussPost(req, res) {
  const postId = req.params.id;
  const { Text, Image_Link, Tags } = req.body;
  discussModel.updateDiscussPost(postId, Text, Image_Link, Tags, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ updated: this.changes });
  });
}

function deleteDiscussPost(req, res) {
  const postId = req.params.id;
  discussModel.deleteDiscussPost(postId, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ deleted: this.changes });
  });
}

function getAllDiscussPosts(req, res) {
  discussModel.getAllDiscussPosts((err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
}

function getDiscussPostsByTags(req, res) {

  const { tags } = req.query;
  const tagsArray = tags.split(',').map(tag => `%${tag.trim()}%`);
  discussModel.getDiscussPostsByTags(tagsArray, (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
}

function getDiscussPostsByText(req, res) {
  const { text } = req.query;
  const searchText = `%${text.trim()}%`;
  discussModel.getDiscussPostsByText(searchText, (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
}

module.exports = { createDiscussPost, getDiscussPost, updateDiscussPost, deleteDiscussPost, getAllDiscussPosts, getDiscussPostsByTags, getDiscussPostsByText };
