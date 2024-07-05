const express = require('express');
const bodyParser = require('body-parser');

const likeRoutes = require('./src/routes/likeRoutes');


const app = express();
app.use(bodyParser.json());


app.use('/like', likeRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
