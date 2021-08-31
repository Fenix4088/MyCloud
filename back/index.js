const express = require('express');
const mongoose = require('mongoose');

const PORT = 5000;
const PASS = 'cloudDrive';
const DB = `mongodb+srv://cloudDrive:${PASS}@cluster0.jypji.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

const startApp = () => {
  try {
    mongoose.connect(DB, { useNewUrlParser: true }, () => {
      console.log('Connected to DB');
    });
    app.listen(PORT, () => {
      console.log('Server started port: ', PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
