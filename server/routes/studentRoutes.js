const express = require('express');
const userRoutes = express.Router();
const Student = require('../models/users/student');
const {loginCtrl,aptDeleteCtrl, logoutCtrl} = require('../controllers/students');
const protected = require('../middlewares/protected');
//user login route
userRoutes.post("/student_login",loginCtrl);
userRoutes.post("/logout", logoutCtrl);
userRoutes.get("/student-appointment", async( req , res ) =>{
    try {
      res.header('Access-Control-Allow-Credentials', true);
      const studentId = req.session.userAuth;
      const studentFound = await Student.findById(studentId).populate('appointment'); 
      if(!studentFound){
        return res.status(404).json({message:'Student Not Found'});
      }
      const studentAppointments = studentFound.appointment.map(appointment => ({
        _id: appointment._id,
        selectedSlot: appointment.selectedSlot,
        serviceType: appointment.serviceType,
        status: appointment.status,
      }));
      console.log("Student Appointments:",studentAppointments);
      res.status(200).json(studentAppointments);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })

userRoutes.delete("/delete/:id",aptDeleteCtrl);
module.exports=userRoutes;