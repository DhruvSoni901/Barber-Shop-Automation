require("dotenv").config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('./config/dbConnect');
const MongoStore = require('connect-mongo');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require("./routes/adminRoute");
const appointmentRoute = require("./routes/appointmentRoutes");

const app = express();
app.use(express.json());
// const allowedOrigins = ['http://localhost:3000']; // Add your frontend origin(s).
app.use(
  cors({
    origin: 'https://barber-shop-automation-8hxq.vercel.app',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  })
);
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongoUrl: process.env.MONGO_URL,
    ttl: 24*60*60,
  }),
  cookie:{
    sameSite: 'lax',
  }
}))





//-----------------------------------routes----------------------------------
//---------------Student routes
app.use('/student-section',studentRoutes);

//---------------application form route
app.use('/appointment',appointmentRoute); 

//---------------admin routes
app.use('/admin',adminRoutes);


//------------------------------------connection-----------------------------
const PORT = process.env.PORT || 9000;
app.listen(PORT,console.log(`Server is up and running on port ${PORT}`));
// Student.insertMany(StudentData);
// Inventory.insertMany(initInv);