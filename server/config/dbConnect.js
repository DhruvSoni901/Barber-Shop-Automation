const mongoose = require('mongoose');
const dbConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected successfully");
    }
    catch (err){
        console.log(err);
    }
}
dbConnection();