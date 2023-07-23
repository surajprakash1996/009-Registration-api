const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controllers');
const {formValidator, validator } = require('../middleware/form-validator');

router.post('/new', formValidator(), validator ,registrationController.registrationNew );

module.exports = router;