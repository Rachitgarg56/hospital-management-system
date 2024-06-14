const { catchAsync } = require('../middlewares/errorHandler');
const AppointmentModel = require('../models/appointment');

const bookAppointmentApiFn = async (req, res) => {
    // Todo: Validations
    await AppointmentModel.create({
        ...req.body,
        userId: req.user._id
    })
    res.json({
        success: true,
        message: "Appointment booked",
    })
}

const editAppointmentApiFn = async (req, res) => {
    const userId = req.user._id;
    const appointmentId = req.params.id;
    const appointment = await AppointmentModel.findById(appointmentId);
    if (
       (req.user.role === 'DOCTOR' && userId !== appointment.doctorId) ||
       (req.user.role === 'PATIENT' && userId !== appointment.userId)
    ) {
        res.status(403).json({
            success: false,
            message: "You do not have permission to edit this appointment",
        })
    }

    // Todo: Add code to edit the appointment 
    res.json({
        success: true,
        message: "Appointment edited successfully",
    })
}

const appointmentController = {
    bookAppointment: catchAsync(bookAppointmentApiFn),
    editAppointment: catchAsync(editAppointmentApiFn),
}

module.exports = appointmentController;