const express = require('express');

const userController = require('../controllers/user');
const passport = require('../middlewares/auth');
const authorizer = require('../middlewares/authorization');

const router = express.Router();

router.post('/admin/addnew', userController.addNewAdmin);   //  /admin/register 

router.post('/doctor/addnew', passport.authenticate('jwt', { session: false }), authorizer(['ADMIN']), userController.addNewDoctor); // only admin can access it 

router.post('/login', userController.loginUser);

module.exports = router;
