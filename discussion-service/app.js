const express = require('express');
const bodyParser = require('body-parser');

const discussRoutes = require('./src/routes/discussRoutes');


const app = express();
app.use(bodyParser.json());

app.use('/discuss', discussRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
