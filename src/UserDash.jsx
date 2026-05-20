import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaCalendarCheck,
  FaMoneyBillWave,
  FaFutbol,
  FaClock
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import MainNavbar from "./MainNavbar";

export default function UserDash() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("userinfo"));

  const [myBookings, setMyBookings] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    spent: 0
  });

  useEffect(() => {

    fetchUserData();

  }, []);

  const fetchUserData = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8080/booking/user/${user.id}`
      );

      const bookings = res.data;

      setMyBookings(
        bookings.slice(0, 5)
      );

      const now = new Date();

      const activeBookings =
        bookings.filter((b) =>
          new Date(b.endTime) > now &&
          b.status !== "CANCELLED"
        );

      const completedBookings =
        bookings.filter((b) =>
          new Date(b.endTime) < now
        );

      const totalSpent =
        bookings.reduce(
          (sum, b) =>
            sum + b.totalAmount,
          0
        );

      setStats({
        total: bookings.length,
        active: activeBookings.length,
        completed:
          completedBookings.length,
        spent: totalSpent
      });

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

      {/* HERO */}
      <div
        className="py-5 text-white"
        style={{
          background:
            "linear-gradient(135deg, #0f172a, #1e293b)"
        }}
      >

        <div className="container">

          <h1 className="fw-bold display-5">
            Welcome, {user?.name}
          </h1>

          <p className="lead mt-3">
            Book grounds, manage bookings
            and track your sports activity.
          </p>

        </div>

      </div>

      <div className="container mt-5">

        {/* STATS */}
        <div className="row g-4">

          {/* TOTAL BOOKINGS */}
          <div className="col-md-3">

            <div
              className="card border-0 shadow-lg p-4 h-100 dashboard-card"
              style={{
                borderRadius: "20px"
              }}
            >

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6 className="text-muted">
                    Total Bookings
                  </h6>

                  <h2 className="fw-bold">
                    {stats.total}
                  </h2>

                </div>

                <div
                  className="text-primary"
                  style={{ fontSize: "45px" }}
                >
                  <FaCalendarCheck />
                </div>

              </div>

            </div>

          </div>

          {/* ACTIVE */}
          <div className="col-md-3">

            <div
              className="card border-0 shadow-lg p-4 h-100 dashboard-card"
              style={{
                borderRadius: "20px"
              }}
            >

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6 className="text-muted">
                    Active Bookings
                  </h6>

                  <h2 className="fw-bold">
                    {stats.active}
                  </h2>

                </div>

                <div
                  className="text-success"
                  style={{ fontSize: "45px" }}
                >
                  <FaClock />
                </div>

              </div>

            </div>

          </div>

          {/* COMPLETED */}
          <div className="col-md-3">

            <div
              className="card border-0 shadow-lg p-4 h-100 dashboard-card"
              style={{
                borderRadius: "20px"
              }}
            >

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6 className="text-muted">
                    Completed
                  </h6>

                  <h2 className="fw-bold">
                    {stats.completed}
                  </h2>

                </div>

                <div
                  className="text-warning"
                  style={{ fontSize: "45px" }}
                >
                  <FaFutbol />
                </div>

              </div>

            </div>

          </div>

          {/* TOTAL SPENT */}
          <div className="col-md-3">

            <div
              className="card border-0 shadow-lg p-4 h-100 dashboard-card"
              style={{
                borderRadius: "20px"
              }}
            >

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6 className="text-muted">
                    Total Spent
                  </h6>

                  <h2 className="fw-bold">
                    ₹{stats.spent}
                  </h2>

                </div>

                <div
                  className="text-danger"
                  style={{ fontSize: "45px" }}
                >
                  <FaMoneyBillWave />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* QUICK ACTIONS + RECENT BOOKINGS */}
        <div className="row mt-5 g-4">

          {/* QUICK ACTIONS */}
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
                    navigate("/bookground")
                  }
                >
                  Book Ground
                </button>

                <button
                  className="btn btn-success py-3 fw-bold"
                  onClick={() =>
                    navigate("/my-bookings")
                  }
                >
                  My Bookings
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
                  className="btn btn-outline-dark btn-sm"
                  style={{
                    position: "absolute",
                    right: "0",
                    width: "fit-content",
                    whiteSpace: "nowrap"
                  }}
                  onClick={() =>
                    navigate("/my-bookings")
                  }
                >
                  View All
                </button>

              </div>

              <div className="table-responsive">

                <table className="table align-middle">

                  <thead>

                    <tr>

                      <th>Ground</th>
                      <th>Location</th>
                      <th>Amount</th>
                      <th>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    {myBookings.map((b) => (

                      <tr key={b.id}>

                        <td>
                          {b.ground?.name}
                        </td>

                        <td>
                          {b.ground?.location}
                        </td>

                        <td>
                          ₹{b.totalAmount}
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              b.status === "BOOKED"
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
              Keep Playing ⚽
            </h3>

            <p className="mb-0 mt-2">
              Book your favorite grounds anytime,
              anywhere with GroundBook.
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