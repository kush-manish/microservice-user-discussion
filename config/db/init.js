const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./common.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS User (
    User_Id TEXT PRIMARY KEY,
    Email TEXT UNIQUE,
    Mobile_No TEXT UNIQUE,
    Name TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS Discuss (
    Post_Id TEXT PRIMARY KEY,
    User_Id TEXT,
    Text TEXT,
    Image_Link TEXT,
    Tags TEXT,
    Created_On TEXT,
    Likes_Count INTEGER DEFAULT 0,
    View_Count INTEGER DEFAULT 0,
    FOREIGN KEY(User_Id) REFERENCES User(User_Id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Follow (
    Follower_Id TEXT,
    Followee_Id TEXT,
    PRIMARY KEY (Follower_Id, Followee_Id),
    FOREIGN KEY (Follower_Id) REFERENCES User(User_Id),
    FOREIGN KEY (Followee_Id) REFERENCES User(User_Id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Comment (
    Comment_Id TEXT PRIMARY KEY,
    Post_Id TEXT,
    Parent_Comment_Id TEXT,
    Comment TEXT,
    Likes_Count INTEGER DEFAULT 0,
    FOREIGN KEY(Post_Id) REFERENCES Discuss(Post_Id),
    FOREIGN KEY(Parent_Comment_Id) REFERENCES Comment(Comment_Id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Like (
    User_Id TEXT,
    Post_Id TEXT,
    Comment_Id TEXT,
    PRIMARY KEY (User_Id, Post_Id, Comment_Id),
    FOREIGN KEY(User_Id) REFERENCES User(User_Id),
    FOREIGN KEY(Post_Id) REFERENCES Discuss(Post_Id),
    FOREIGN KEY(Comment_Id) REFERENCES Comment(Comment_Id)
  )`);
});

module.exports = db;
