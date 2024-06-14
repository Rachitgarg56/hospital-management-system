const express = require('express');

const appointmentController = require('../controllers/appointment');
const passport = require('../middlewares/auth');
const authorizer = require('../middlewares/authorization');

const router = express.Router();

router.post(
    '/post',
    passport.authenticate("jwt", { session: false }),
    authorizer(['PATIENT']),
    appointmentController.bookAppointment
); // api/v1/appointment

router.put(
    '/update/:id',
    passport.authenticate("jwt", { session: false }),
    authorizer(['ADMIN', 'DOCTOR', 'PATIENT']),
    appointmentController.editAppointment
);

module.exports = router;

