const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema(
  {
    firstName:{
      type: String,
      required: true,
    },
    lastName:{
      type: String,
      required: true,
    },
    serviceType:{
      type: String,
      required: true,
    },
    selectedSlot:{
      type: String,
      required: true,
    },
    student:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Student',
    },
    status:{
      type: String,
      enum: ['Pending','Approved','Declined'],
      default: 'Pending',
    }
  },
  {
    timestamps:true,
  }
);

const AppointmentModel = mongoose.model('Appointment',appointmentSchema);
module.exports = AppointmentModel;