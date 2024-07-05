const { spawn } = require('child_process');
const path = require('path');

const apps = [
  path.join(__dirname, 'user-service', 'app.js'),
  path.join(__dirname, 'discussion-service', 'app.js'),
  path.join(__dirname, 'follow-service', 'app.js'),
  path.join(__dirname, 'comment-service', 'app.js'),
  path.join(__dirname, 'like-service', 'app.js')
];

apps.forEach(app => {
  const process = spawn('node', [app]);

  process.stdout.on('data', (data) => {
    console.log(`stdout from ${app}: ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr from ${app}: ${data}`);
  });

  process.on('close', (code) => {
    console.log(`${app} process exited with code ${code}`);
  });
});

const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const apiProxy = httpProxy.createProxyServer();

const userService = 'http://localhost:3004';
const discussionService = 'http://localhost:3001';
const followService = 'http://localhost:3002';
const commentService = 'http://localhost:3005';
const likeService = 'http://localhost:3003';

app.use('/api/users', (req, res) => {
  apiProxy.web(req, res, { target: userService });
});

app.use('/api/discuss', (req, res) => {
  apiProxy.web(req, res, { target: discussionService });
});

app.use('/api/follow', (req, res) => {
  apiProxy.web(req, res, { target: followService });
});

app.use('/api/comments', (req, res) => {
  apiProxy.web(req, res, { target: commentService });
});

app.use('/api/like', (req, res) => {
  apiProxy.web(req, res, { target: likeService });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}\n\n`);
});
