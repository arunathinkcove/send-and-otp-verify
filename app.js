require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./src/routes/otp');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.DBURI)
  .then(() => console.log('Connected to the database'))
  .catch(error => console.error(error));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
