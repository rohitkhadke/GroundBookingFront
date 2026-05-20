import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const UserNav = () => {
    
    const navigate=useNavigate();

    let user=JSON.parse(localStorage.getItem("userinfo"));


let logout=()=>{
    localStorage.removeItem("userinfo")
    navigate("/")
}
    return (
        <div>
            <nav className="admin-nav">
                <div className="nav-left">
                    <div className="logo">🏟️ User</div>
                </div>

                <ul className="nav-links">
                    <li><Link to={"/UserDash"}>Dashboard</Link></li>
                    <li><Link to={"/bookground"}>View Ground</Link></li>
                    <li> <Link to={"/my-bookings"}>My Bookings</Link></li>
                    <li> <Link to={"/my-payments"}>Payment Hisotry</Link></li>
                    <li><Link to={"/about-us"}>About Us</Link></li>
                    <li><Link to={"/contact-us"} >Contact Us</Link></li>
                </ul>

                <div className="nav-right">
                    <button className="logout-btn" onClick={logout}>Logout</button>
                </div>
            </nav>
        </div>

    )
}
