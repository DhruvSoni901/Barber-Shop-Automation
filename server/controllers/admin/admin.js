const Appointment = require('../../models/appointments/appointment')
const Student = require('../../models/users/student');
const Inventory = require('../../models/inventory');
const bcrypt = require('bcrypt');

const adminHashedPassword = '$2b$11$tu3YWJ10ESN395h6isAQvuauKaoAf1wRaXVLYlZDdQ1qkqRULF8HO';

const loginCtrl = (req, res) => {
  
    try{
          const { password } = req.body; 
          bcrypt.compare(password, adminHashedPassword, (err, result) => {
            if (err) {
              console.error('Error comparing passwords:', err);
              return res.status(500).json({ message: 'Server error' });
            }
        
            if (result) {
              // Passwords match, allow access
              return res.status(200).json({ message: 'Admin login successful' });
            } else {
              // Passwords do not match, deny access
              return res.status(401).json({ message: 'Admin login failed' });
            }
          });
      }catch(err){
          console.error(err);
          return res.status(500).json({message:'Internal Server Error'});
    }
}

const detailCtrl = async (req,res) =>{
    try {
      const appointments = await Appointment.find();
      const appointmentDetail = await Promise.all(
        appointments.map(async (appointment) =>{
          const studentId = appointment.student;
          if(studentId){
            const student = await Student.findById(studentId);
            if(student){
              return {
                ...appointment._doc,
                rollno: student.rollno,
                contact: student.contact,
              }
            }else{
              console.error(`Student not found for appointment ID ${appointment._id}`);
            }
          }else{
            console.error(`Student ID not found for appointment ID ${appointment._id}`);
          }
        })
      )
      console.log('appo',appointmentDetail);
      res.status(200).json(appointmentDetail);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

const approveCtrl = async (req, res) => {
    try {
      const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { status: 'Approved' },
        { new: true }
      );
      res.status(200).json(appointment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deleteCtrl = async (req, res) => {
    try {
      await Appointment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Appointment declined and deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

const invDetailCtrl = async (req,res)=>{
    try{
      const inventory = await Inventory.findOne();
      console.log("I", inventory);
      res.status(200).json(inventory);
    }catch(error){
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error'});
    }
}

const updateinvCtrl = async (req,res)=>{
    try{
      const {scissors , comb , cloth, shavingcream, powder, blade} = req.body;
      const inventory = await Inventory.findOne();
  
      //updation underway
      inventory.scissors = scissors;
      inventory.comb = comb;
      inventory.cloth = cloth;
      inventory.shavingcream = shavingcream;
      inventory.powder = powder;
      inventory.blade = blade;
  
      await inventory.save();
      res.status(200).json({ message: 'Inventory updated successfully' });
  
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

module.exports = {loginCtrl,detailCtrl,approveCtrl,deleteCtrl, invDetailCtrl, updateinvCtrl};