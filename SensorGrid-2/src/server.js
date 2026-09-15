require('dotenv').config();

const express = require('express');
const deviceRoutes = require('./routes/deviceRoutes');
const readingRoutes = require('./routes/readingRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'SensorGrid API is running' }));
app.use('/api/devices', deviceRoutes);
app.use('/api/readings', readingRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => console.log(`SensorGrid API listening on port ${port}`));
