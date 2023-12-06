import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'animate.css';

import Footer from './components/Footer';
import Home from './components/Home';
import Student_login from './components/student_login';
import Admin_login from './components/admin_login';
import AddAppointment from './components/Add_appointment';
import AdminDashboard from './components/admin_dashboard'; 
import StudentDashboard from './components/student_dashboard';

function App() {

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        

        {/*Main Content*/}
          {/* Routing */}
          <Routes>
            <Route path='/' exact element={<Home/>}/> 
            <Route path="/student_login" element={<Student_login/>}/>
            <Route path="/admin_login" element={<Admin_login/>}/>
            <Route path="/student_form" element={<AddAppointment/>}/>
            <Route path='/admin_dashboard' element={<AdminDashboard/>}/>
            <Route path='/student_dashboard' element={<StudentDashboard/>}/>
          </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
