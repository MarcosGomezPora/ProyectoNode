const express = require('express');
const { hasRole } = require('../../utils/auth/middlewares/authMiddlewares');
const controller = require('./index.controller');

const router = express.Router();

router.get('/', controller.indexGet);
router.get('/status', hasRole(['user', 'admin']), controller.statusGet);

module.exports = router;