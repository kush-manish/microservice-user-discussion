const express = require('express');
const bodyParser = require('body-parser');

const followRoutes = require('./src/routes/followRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/follow', followRoutes);


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
