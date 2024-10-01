//Import modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

//Set views to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//to be able to use url
app.use(bodyParser.urlencoded({ extended: true }));

//Routes setup
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

//Start the server
const PORT = process.env.PORT || 3000; //Default to port 3000 if not provided in environment variables
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); //Confirmation that the server is up
});

