const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM readings ORDER BY recorded_at DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { device_id, value } = req.body;
    if (device_id === undefined || value === undefined) {
      return res.status(400).json({ message: 'device_id and value are required' });
    }
    const { rows } = await db.query(
      'INSERT INTO readings (device_id, value) VALUES ($1, $2) RETURNING *',
      [device_id, value]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
