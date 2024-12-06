// server/routes/guide.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Guide route' });
});

module.exports = router;