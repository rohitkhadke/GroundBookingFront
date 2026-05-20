import logo from './logo.svg';
import './App.css';
import Register from './Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDash from './AdminDash';
import UserDash from './UserDash';
import AddGrounds from './AddGrounds';
import ManageUsers from './ManageUsers';
import { ManageGrounds } from './ManageGrounds';
import { UpdateGround } from './UpdateGround';
import { BookGround } from './BookGround';
import { MyBookings } from './MyBookings';
import { GroundDetails } from './GroundDetails';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import AdminContact from './AdminContact';
import { ManageBookings } from './ManageBookings';
import { ProtectedRoute } from './ProtectedRoutes';
import { MyPayments } from './MyPayments';
import { ManagePayments } from './ManagePayments';
import LandingPage from './LandingPage';
import MainNavbar from './MainNavbar';
import PublicNav from './PublicNav';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route
            path='/AdminDash'
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDash />
              </ProtectedRoute>
            }
          />

          <Route
            path='/UserDash'
            element={
              <ProtectedRoute allowedRole="user">
                <UserDash />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addGrounds"
            element={
              <ProtectedRoute allowedRole="admin">
                <AddGrounds />
              </ProtectedRoute>
            }
          />

          <Route
            path='/manageUsers'
            element={
              <ProtectedRoute allowedRole="admin">
                <ManageUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path='/manageGrounds'
            element={
              <ProtectedRoute allowedRole="admin">
                <ManageGrounds />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update-ground/:id"
            element={
              <ProtectedRoute allowedRole="admin">
                <UpdateGround />
              </ProtectedRoute>
            }
          />

          <Route
            path='/manage-bookings'
            element={
              <ProtectedRoute allowedRole="admin">
                <ManageBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path='/manage-payments'
            element={
              <ProtectedRoute allowedRole="admin">
                <ManagePayments />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin-contact'
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminContact />
              </ProtectedRoute>
            }
          />

          <Route
            path='/bookground'
            element={
              <ProtectedRoute allowedRole="user">
                <BookGround />
              </ProtectedRoute>
            }
          />

          <Route
            path='/my-bookings'
            element={
              <ProtectedRoute allowedRole="user">
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path='/my-payments'
            element={
              <ProtectedRoute allowedRole="user">
                <MyPayments />
              </ProtectedRoute>
            }
          />

          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/registerUser' element={<Register />}></Route>
          <Route path="/ground/:id" element={<GroundDetails />} />
          <Route path='/about-us' element={<AboutUs />}></Route>
          <Route path='/contact-us' element={<ContactUs />}></Route>
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
