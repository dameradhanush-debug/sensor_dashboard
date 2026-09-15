const db = require('../db');

async function getDevices(req, res, next) {
  try {
    const { rows } = await db.query('SELECT * FROM devices ORDER BY id');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

async function getDeviceById(req, res, next) {
  try {
    const { rows } = await db.query('SELECT * FROM devices WHERE id = $1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ message: 'Device not found' });
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

async function createDevice(req, res, next) {
  try {
    const { name, type, location } = req.body;
    if (!name || !type) return res.status(400).json({ message: 'name and type are required' });
    const { rows } = await db.query(
      'INSERT INTO devices (name, type, location) VALUES ($1, $2, $3) RETURNING *',
      [name, type, location || null]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = { getDevices, getDeviceById, createDevice };
