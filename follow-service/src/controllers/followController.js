const followModel = require('../models/followModel');

function followUser(req, res) {
  const { followeeId } = req.body;
  const followerId = req.userId;
  followModel.followUser(followerId, followeeId, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Followed successfully' });
  });
}

function unfollowUser(req, res) {
  const { followeeId } = req.body;
  const followerId = req.userId;
  followModel.unfollowUser(followerId, followeeId, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Unfollowed successfully' });
  });
}

function getFollowers(req, res) {
  const userId = req.params.id;
  followModel.getFollowers(userId, (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
}

function getFollowees(req, res) {
  const userId = req.params.id;
  followModel.getFollowees(userId, (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
}

module.exports = { followUser, unfollowUser, getFollowers, getFollowees };
