const StudentModel = require('../models/users/student');
const Appointment = require('../models/appointments/appointment');
const appErr = require('../utils/appErr');

const loginCtrl = async(req,res)=>{
    const { email , password }  = req.body;
    if(!email || !password){
        return next(appErr('All fields are required'));
    }

    try{
        const studentFound = await StudentModel.findOne({email});
        res.header('Access-Control-Allow-Credentials', true);
        if(!studentFound){
            return res.status(400).json({ message: 'Student not found' });
        }
        //else verify password
        if (studentFound.password !== password) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        //verified?
        req.session.userAuth = studentFound._id;
        console.log(req.session);
        return res.status(200).json({ message: 'Login successful', studentFound });

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
const aptDeleteCtrl = async (req, res) => {
    try {
      await Appointment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}
const logoutCtrl = async (req, res)=>{
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to logout' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful' });
    });
}
module.exports = {loginCtrl,aptDeleteCtrl,logoutCtrl};