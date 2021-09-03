const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRoutes = require('./routes/authRoutes.js');
const fileRoutes = require('./routes/fileRoutes.js');
const cors = require('cors');

const PORT = config.get('serverPort');
const DB = `mongodb+srv://cloudDrive:${config.get("password")}@cluster0.jypji.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

const startApp = async () => {
  try {
    await mongoose.connect(DB, { useNewUrlParser: true }, () => {
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
