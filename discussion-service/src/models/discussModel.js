const db = require('../../../config/db/init');

function createDiscussPost(Post_Id, User_Id, Text, Image_Link, Tags, Created_On, callback) {
  db.run(`INSERT INTO Discuss (Post_Id, User_Id, Text, Image_Link, Tags, Created_On) VALUES (?, ?, ?, ?, ?, ?)`, [Post_Id, User_Id, Text, Image_Link, Tags, Created_On], callback);
}

function getDiscussPostById(postId, callback) {
  db.get(`SELECT * FROM Discuss WHERE Post_Id = ?`, [postId], callback);
}

function updateDiscussPost(postId, Text, Image_Link, Tags, callback) {
  db.run(`UPDATE Discuss SET Text = ?, Image_Link = ?, Tags = ? WHERE Post_Id = ?`, [Text, Image_Link, Tags, postId], callback);
}

function deleteDiscussPost(postId, callback) {
  db.run(`DELETE FROM Discuss WHERE Post_Id = ?`, [postId], callback);
}

function getAllDiscussPosts(callback) {
  db.all(`SELECT * FROM Discuss`, [], callback);
}

function getDiscussPostsByTags(tagsArray, callback) {
  const placeholders = tagsArray.map(() => 'Tags LIKE ?').join(' OR ');
  db.all(`SELECT * FROM Discuss WHERE ${placeholders}`, tagsArray, callback);
}

function getDiscussPostsByText(searchText, callback) {
  db.all(`SELECT * FROM Discuss WHERE Text LIKE ?`, [searchText], callback);
}

function incrementViewCount(postId, callback) {
  db.run(`UPDATE Discuss SET View_Count = View_Count + 1 WHERE Post_Id = ?`, [postId], callback);
}

module.exports = { createDiscussPost, getDiscussPostById, updateDiscussPost, deleteDiscussPost, getAllDiscussPosts, getDiscussPostsByTags, getDiscussPostsByText, incrementViewCount };
