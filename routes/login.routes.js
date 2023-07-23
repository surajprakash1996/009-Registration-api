
const express = require('express');
const router = express.Router();
const loginController =  require('../controllers/login.controller');
const { formValidator , validator } = require('../middleware/log-auth');
const validateToken = require('../middleware/validateToken');

router.post('/', formValidator(), validator , loginController.login  );
router.get('/dashboard', validateToken, loginController.getDashboard )


module.exports = router;