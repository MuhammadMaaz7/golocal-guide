const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (you'll need to set up your MONGO_URI in a .env file)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const touristRoutes = require('./routes/tourist');
const guideRoutes = require('./routes/guide');
const businessRoutes = require('./routes/business');

app.use('/api/tourist', touristRoutes);
app.use('/api/guide', guideRoutes);
app.use('/api/business', businessRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});