const express = require('express');
const router = express.Router();
const horizonsService = require('../services/horizonsService');

router.get('/trajectory', async (req, res) => {
  try {
    const { des_id = '54481740', start_time = '2024-01-01', stop_time = '2024-12-31' } = req.query;
    const trajectory = await horizonsService.getAsteroidTrajectory(des_id, start_time, stop_time);
    res.json(trajectory);
  } catch (error) {
    console.error('Error fetching trajectory:', error);
    res.status(500).json({ error: 'Failed to fetch trajectory data.' });
  }
});

router.get('/asteroid_list', (req, res) => {
  const asteroidIds = [
    '20000433', '20005535', '20009969', '1000005', '1000012', '20000001',
    '20000951', '20152830', '1000107', '20000016', '20000243', '20065803',
    '20000617', '20000433', '20000052', '20000951', '20001272', '20000433',
    '1000041', '20011351', '20015094', '20003548', '20000004', '20099942',
    '20101955', '20000253', '20000021', '20162173', '20052246', '20025143',
    '1000093', '1000394', '20021900', '20162173', '54483134', '54481752',
    '54480955', '254481754', '54483140'
  ];
  res.json(asteroidIds);
});

module.exports = router;