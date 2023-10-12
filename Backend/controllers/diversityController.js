// controllers/diversityController.js
const config = require('../config/config');
const nano = require('nano')(config.database.url);
const db = nano.use(config.database.dbName);

const diversityCounts = (req, res) => {
  db.view('diversity_per_month', 'diversity', { group_level: 2 }, (err, body) => {
    if (err) {
      console.error('Error fetching diversity counts:', err);
      res.status(500).json({ message: 'Error fetching diversity counts' });
    } else {
      const diversityCounts = body.rows.map((row) => ({
        year: row.key[0],
        month: row.key[1],
        counts: row.value,
      }));
      res.status(200).json(diversityCounts);
    }
  });
};

module.exports = {
  diversityCounts,
};
