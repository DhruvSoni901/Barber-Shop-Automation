// server/routes/appointmentRoutes.js
const express = require('express');
const appointmentRoute = express.Router();
const Appointment = require('../models/appointments/appointment'); 
const Student = require('../models/users/student');
const protected = require('../middlewares/protected');
const slots = require('../../frontend-react/src/slotList');


// Create a new appointment
appointmentRoute.post('/student_form', protected, async (req, res) => {
  try {
    const { firstName, lastName, serviceType, selectedSlot } = req.body;
    
    res.header('Access-Control-Allow-Credentials', true);
    const studentId = req.session.userAuth;
    const studentFound = await Student.findById(studentId);

    const slot=slots.find((s)=> s.id === parseInt(selectedSlot));
    if(!slot || !slot.available){
      return res.status(400).json({message: "This slot is not available"});
    }
    slot.available = false;
    console.log(slots);
    
    const appointment = new Appointment({
      firstName,
      lastName,
      serviceType,
      selectedSlot,
      student: studentFound._id,
    });
    await appointment.save();
    res.status(200).json({ message: 'Appointment created successfully' , appointment});

    studentFound.appointment.push(appointment._id);
    await studentFound.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = appointmentRoute;
