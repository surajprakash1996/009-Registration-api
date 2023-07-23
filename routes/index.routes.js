const express = require('express');
const router = express.Router();
const registrationRoute = require('./registration.routes');
const loginRoute = require('../routes/login.routes');

router.use('/registration', registrationRoute );
router.use('/login', loginRoute );

module.exports = router;