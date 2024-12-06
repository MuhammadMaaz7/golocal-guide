const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const guideroutes= require('./routes/guide/guideProfileRoutes');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/profile', guideroutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

