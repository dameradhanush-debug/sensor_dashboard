const express = require('express');
const controller = require('../controllers/deviceController');

const router = express.Router();

router.get('/', controller.getDevices);
router.get('/:id', controller.getDeviceById);
router.post('/', controller.createDevice);

module.exports = router;
