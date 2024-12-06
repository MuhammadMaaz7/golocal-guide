// server/routes/business.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Business route' });
});

module.exports = router;