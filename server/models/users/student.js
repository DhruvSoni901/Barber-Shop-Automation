const mongoose = require('mongoose');

const studentschema = new mongoose.Schema(
    {   
        email:{
            type:String,
            required: true,
        },
        firstname:{
            type: String,
            required: true,
        },
        lastname:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        rollno:{
            type: String,
            required : true,
        },
        contact:{
            type: Number,
            required: true,
        },
        appointment:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment',
        }],

    },{
        timestamps: true,
    }
)
const Student = mongoose.model("Student",studentschema);
module.exports=Student;