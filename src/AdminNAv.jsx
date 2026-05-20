import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/adminnav.css'

export default function AdminNAv() {

    const navigate = useNavigate();

    let user = JSON.parse(localStorage.getItem("userinfo"));


    let logout = () => {
        localStorage.removeItem("userinfo")
        navigate("/")
    }
    return (
        <div>
            <nav className="admin-nav">
               <div className="nav-left">
                    <div className="logo">🏟️  Admin </div>
                </div>

                <ul className="nav-links">
                    <li><Link to={"/AdminDash"}>Dashboard</Link></li>
                    <li><Link to={"/addGrounds"}>Add Ground</Link></li>
                    <li><Link to={"/manageGrounds"}>Manage Grounds</Link></li>
                    <li><Link to={"/manageUsers"}>Manage Users</Link></li>
                    <li><Link to={"/manage-bookings"}>Manage Bookings</Link></li>
                    <li><Link to={"/manage-payments"}>Manage Payments</Link></li>
                    <li><Link to={"/admin-contact"}>Contact Msgs</Link></li>
                </ul>

                <div className="nav-right">
                    <button className="logout-btn" onClick={logout}>Logout</button>
                </div>
            </nav>
        </div>
    )
}
