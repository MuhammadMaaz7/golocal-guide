// server/routes/tourist.js
const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'Tourist route' });
});

module.exports = router;

// Create similar files for guide.js and business.js