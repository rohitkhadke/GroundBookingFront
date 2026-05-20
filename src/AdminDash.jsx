import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FaUsers,
    FaFutbol,
    FaCalendarCheck,
    FaEnvelope,
    FaMoneyBillWave,
    FaArrowUp
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import MainNavbar from "./MainNavbar";

export default function AdminDash() {

    const navigate = useNavigate();

    const [users, setUsers] = useState(0);
    const [grounds, setGrounds] = useState(0);
    const [bookings, setBookings] = useState(0);
    const [contacts, setContacts] = useState(0);

    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {

        fetchDashboardData();

    }, []);

    const fetchDashboardData = async () => {

        try {

            const [
                usersRes,
                groundsRes,
                bookingsRes,
                contactsRes
            ] = await Promise.all([
                axios.get("http://localhost:8080/allusers"),
                axios.get("http://localhost:8080/Allgrounds"),
                axios.get("http://localhost:8080/booking/all"),
                axios.get("http://localhost:8080/api/contact")
            ]);

            setUsers(usersRes.data.length);
            setGrounds(groundsRes.data.length);
            setBookings(bookingsRes.data.length);
            setContacts(contactsRes.data.length);

            const sortedBookings = bookingsRes.data.sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );

            setRecentBookings(
                sortedBookings.slice(0, 5)
            );

        } catch (err) {

            console.error(err);

        }
    };

    return (

        <div
            style={{
                background: "#f4f7fb",
                minHeight: "100vh"
            }}
        >

            <MainNavbar />

            {/* HERO SECTION */}
            <div
                className="py-5 text-white"
                style={{
                    background:
                        "linear-gradient(135deg, #0f172a, #1e293b)"
                }}
            >

                <div className="container">

                    <div className="d-flex justify-content-between align-items-center flex-wrap">

                        <div>

                            <h1 className="fw-bold display-5">
                                Admin Dashboard
                            </h1>

                            <p className="lead text-light mt-3">
                                Manage users, grounds, bookings,
                                payments and platform activity.
                            </p>

                        </div>

                        <div>

                            <button
                                className="btn btn-warning fw-bold px-4 py-2"
                                onClick={() =>
                                    navigate("/addGrounds")
                                }
                            >
                                + Add Ground
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* STATS */}
            <div className="container mt-5">

                <div className="row g-4">

                    {/* USERS */}
                    <div className="col-md-3">

                        <div
                            className="card border-0 shadow-lg p-4 h-100 dashboard-card"
                            style={{
                                borderRadius: "20px",
                                cursor: "pointer"
                            }}
                            onClick={() =>
                                navigate("/manageUsers")
                            }
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h6 className="text-muted">
                                        Total Users
                                    </h6>

                                    <h2 className="fw-bold">
                                        {users}
                                    </h2>

                                </div>

                                <div
                                    className="text-primary"
                                    style={{ fontSize: "45px" }}
                                >
                                    <FaUsers />
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* GROUNDS */}
                    <div className="col-md-3">

                        <div
                            className="card border-0 shadow-lg p-4 h-100 dashboard-card"
                            style={{
                                borderRadius: "20px",
                                cursor: "pointer"
                            }}
                            onClick={() =>
                                navigate("/manageGrounds")
                            }
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h6 className="text-muted">
                                        Total Grounds
                                    </h6>

                                    <h2 className="fw-bold">
                                        {grounds}
                                    </h2>

                                </div>

                                <div
                                    className="text-success"
                                    style={{ fontSize: "45px" }}
                                >
                                    <FaFutbol />
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* BOOKINGS */}
                    <div className="col-md-3">

                        <div
                            className="card border-0 shadow-lg p-4 h-100 dashboard-card"
                            style={{
                                borderRadius: "20px",
                                cursor: "pointer"
                            }}
                            onClick={() =>
                                navigate("/manage-bookings")
                            }
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h6 className="text-muted">
                                        Total Bookings
                                    </h6>

                                    <h2 className="fw-bold">
                                        {bookings}
                                    </h2>

                                </div>

                                <div
                                    className="text-warning"
                                    style={{ fontSize: "45px" }}
                                >
                                    <FaCalendarCheck />
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* CONTACTS */}
                    <div className="col-md-3">

                        <div
                            className="card border-0 shadow-lg p-4 h-100 dashboard-card"
                            style={{
                                borderRadius: "20px",
                                cursor: "pointer"
                            }}
                            onClick={() =>
                                navigate("/admin-contact")
                            }
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h6 className="text-muted">
                                        Contact Messages
                                    </h6>

                                    <h2 className="fw-bold">
                                        {contacts}
                                    </h2>

                                </div>

                                <div
                                    className="text-danger"
                                    style={{ fontSize: "45px" }}
                                >
                                    <FaEnvelope />
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* QUICK ACTIONS */}
                <div className="row mt-5 g-4">

                    <div className="col-md-4">

                        <div
                            className="card border-0 shadow-lg p-4 h-100"
                            style={{
                                borderRadius: "20px"
                            }}
                        >

                            <h4 className="fw-bold mb-4">
                                Quick Actions
                            </h4>

                            <div className="d-grid gap-3">

                                <button
                                    className="btn btn-dark py-3 fw-bold"
                                    onClick={() =>
                                        navigate("/addGrounds")
                                    }
                                >
                                    Add New Ground
                                </button>

                                <button
                                    className="btn btn-primary py-3 fw-bold"
                                    onClick={() =>
                                        navigate("/manageGrounds")
                                    }
                                >
                                    Manage Grounds
                                </button>

                                <button
                                    className="btn btn-success py-3 fw-bold"
                                    onClick={() =>
                                        navigate("/manage-bookings")
                                    }
                                >
                                    Manage Bookings
                                </button>

                                <button
                                    className="btn btn-warning py-3 fw-bold text-dark" onClick={() => navigate("/manage-payments")}
                                >
                                    <FaMoneyBillWave className="me-2" />
                                    Payment History
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* RECENT BOOKINGS */}
                    <div className="col-md-8">

                        <div
                            className="card border-0 shadow-lg p-4"
                            style={{
                                borderRadius: "20px"
                            }}
                        >

                            <div className="d-flex justify-content-center align-items-center mb-4 position-relative">

                                <h4 className="fw-bold mb-0 text-center">
                                    Recent Bookings
                                </h4>
                                <button
                                    className="btn btn-outline-dark btn-sm px-3 flex-grow-0"
                                    style={{
                                        position: "absolute",
                                        right: "0",
                                        width: "fit-content",
                                        whiteSpace: "nowrap"
                                    }}
                                    onClick={() =>
                                        navigate("/manage-bookings")
                                    }
                                >
                                    View All
                                </button>

                            </div>

                            <div className="table-responsive">

                                <table className="table align-middle">

                                    <thead>

                                        <tr>

                                            <th>User</th>
                                            <th>Ground</th>
                                            <th>Amount</th>
                                            <th>Status</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {recentBookings.map((b) => (

                                            <tr key={b.id}>

                                                <td>
                                                    {b.user?.name}
                                                </td>

                                                <td>
                                                    {b.ground?.name}
                                                </td>

                                                <td>
                                                    ₹{b.totalAmount}
                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${b.status === "BOOKED"
                                                            ? "bg-success"
                                                            : b.status === "CANCELLED"
                                                                ? "bg-danger"
                                                                : "bg-primary"
                                                            }`}
                                                    >
                                                        {b.status}
                                                    </span>

                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

                {/* FOOTER CARD */}
                <div className="mt-5 mb-4">

                    <div
                        className="card border-0 shadow-lg p-4 text-center"
                        style={{
                            borderRadius: "20px",
                            background:
                                "linear-gradient(135deg, #1e293b, #0f172a)",
                            color: "white"
                        }}
                    >

                        <h3 className="fw-bold">
                            GroundBook Admin Panel
                        </h3>

                        <p className="mb-0 mt-2">
                            Monitor your entire booking platform
                            from one place.
                        </p>

                    </div>

                </div>

            </div>

            {/* HOVER EFFECT */}
            <style>
                {`
          .dashboard-card {
            transition: 0.3s;
          }

          .dashboard-card:hover {
            transform: translateY(-8px);
          }
        `}
            </style>

        </div>
    );
}