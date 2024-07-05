const express = require('express');
const bodyParser = require('body-parser');

const commentRoutes = require('./src/routes/commentRoutes');


const app = express();
app.use(bodyParser.json());


app.use('/comments', commentRoutes);


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
