import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserNav } from "./UserNav";
import MainNavbar from "./MainNavbar";

export const MyBookings = () => {

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // ✅ PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const bookingsPerPage = 20;

  const navigate = useNavigate();

  // ================= LOAD BOOKINGS =================
  useEffect(() => {

    const storedUser =
      localStorage.getItem("userinfo");

    if (!storedUser) {

      alert("Please login first");

      navigate("/login");

      return;
    }

    const user = JSON.parse(storedUser);

    fetchBookings(user.id);

  }, []);

  // ================= FETCH =================
  const fetchBookings = async (userId) => {

    try {

      const res = await axios.get(
        `http://localhost:8080/booking/user/${userId}`
      );

      // Latest first
      const sorted = [...res.data].sort(
        (a, b) =>
          new Date(b.startTime) -
          new Date(a.startTime)
      );

      setBookings(sorted);

    } catch (err) {

      console.error(err);

      alert("Error fetching bookings");
    }
  };

  // ================= CANCEL =================
  const cancelBooking = async (bookingId) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel?"
    );

    if (!confirmCancel) return;

    try {

      await axios.put(
        `http://localhost:8080/booking/cancel/${bookingId}`
      );

      const user = JSON.parse(
        localStorage.getItem("userinfo")
      );

      fetchBookings(user.id);

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data ||
        "Cancel failed"
      );
    }
  };

  // ================= STATUS =================
  const getDisplayStatus = (b) => {

    const now = new Date();

    const start = new Date(b.startTime);
    const end = new Date(b.endTime);

    if (b.status === "CANCELLED") {
      return "CANCELLED";
    }

    if (b.status === "COMPLETED") {
      return "COMPLETED";
    }

    if (start <= now && end >= now) {
      return "STARTED";
    }

    if (end < now) {
      return "COMPLETED";
    }

    return "BOOKED";
  };

  // ================= BADGE =================
  const getBadgeClass = (status) => {

    switch (status) {

      case "BOOKED":
        return "bg-success";

      case "STARTED":
        return "bg-warning text-dark";

      case "COMPLETED":
        return "bg-primary";

      case "CANCELLED":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  // ================= BUTTON =================
  const getButtonClass = (status) => {

    switch (status) {

      case "BOOKED":
        return "btn-danger";

      case "STARTED":
        return "btn-warning text-dark";

      case "COMPLETED":
        return "btn-primary";

      case "CANCELLED":
        return "btn-secondary";

      default:
        return "btn-secondary";
    }
  };

  // ================= CAN CANCEL =================
  const canCancel = (b) => {
    return getDisplayStatus(b) === "BOOKED";
  };

  // ================= FILTER =================
  const filteredBookings = useMemo(() => {

    return bookings.filter((b) => {

      const status =
        getDisplayStatus(b);

      const groundName =
        b.ground?.name?.toLowerCase() || "";

      const location =
        b.ground?.location?.toLowerCase() || "";

      const searchMatch =
        groundName.includes(
          search.toLowerCase()
        ) ||
        location.includes(
          search.toLowerCase()
        );

      const statusMatch =
        statusFilter === "ALL" ||
        status === statusFilter;

      return searchMatch && statusMatch;
    });

  }, [bookings, search, statusFilter]);

  // ================= PAGINATION =================

  const totalPages = Math.ceil(
    filteredBookings.length / bookingsPerPage
  );

  const lastIndex =
    currentPage * bookingsPerPage;

  const firstIndex =
    lastIndex - bookingsPerPage;

  const currentBookings =
    filteredBookings.slice(
      firstIndex,
      lastIndex
    );

  return (

    <div>

      <MainNavbar/>

      <div className="container mt-4">

        {/* ================= HEADER ================= */}

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

          <h2 className="mb-0">
            My Bookings
          </h2>

          {/* SEARCH */}
          <input
            type="text"
            className="form-control"
            placeholder="Search by ground or location"
            style={{ width: "300px" }}
            value={search}
            onChange={(e) => {

              setSearch(e.target.value);

              // reset page
              setCurrentPage(1);
            }}
          />

        </div>

        {/* ================= FILTER BUTTONS ================= */}

        <div className="d-flex gap-2 flex-wrap mb-4">

          <button
            className={`btn ${statusFilter === "ALL"
              ? "btn-dark"
              : "btn-outline-dark"
              }`}
            onClick={() => {

              setStatusFilter("ALL");
              setCurrentPage(1);

            }}
          >
            All
          </button>

          <button
            className={`btn ${statusFilter === "BOOKED"
              ? "btn-success"
              : "btn-outline-success"
              }`}
            onClick={() => {

              setStatusFilter("BOOKED");
              setCurrentPage(1);

            }}
          >
            Booked
          </button>

          <button
            className={`btn ${statusFilter === "STARTED"
              ? "btn-warning"
              : "btn-outline-warning"
              }`}
            onClick={() => {

              setStatusFilter("STARTED");
              setCurrentPage(1);

            }}
          >
            Started
          </button>

          <button
            className={`btn ${statusFilter === "COMPLETED"
              ? "btn-primary"
              : "btn-outline-primary"
              }`}
            onClick={() => {

              setStatusFilter("COMPLETED");
              setCurrentPage(1);

            }}
          >
            Completed
          </button>

          <button
            className={`btn ${statusFilter === "CANCELLED"
              ? "btn-danger"
              : "btn-outline-danger"
              }`}
            onClick={() => {

              setStatusFilter("CANCELLED");
              setCurrentPage(1);

            }}
          >
            Cancelled
          </button>

        </div>

        {/* ================= TABLE ================= */}

        <div className="table-responsive shadow rounded">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-dark">

              <tr>

                <th>#</th>
                <th>Ground</th>
                <th>Location</th>
                <th>Start</th>
                <th>End</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {currentBookings.length > 0 ? (

                currentBookings.map((b, index) => {

                  const status =
                    getDisplayStatus(b);

                  return (

                    <tr key={b.id}>

                      <td>
                        {firstIndex + index + 1}
                      </td>

                      {/* GROUND */}
                      <td>

                        <div className="d-flex align-items-center gap-3">

                          {/* IMAGE */}
                          {b.ground?.images?.length > 0 ? (

                            <img
                              src={`http://localhost:8080/images/${b.ground.images[0]}`}
                              alt="ground"
                              style={{
                                width: "80px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "10px",
                              }}
                            />

                          ) : (

                            <img
                              src="https://via.placeholder.com/80x60"
                              alt="no-img"
                              style={{
                                borderRadius: "10px",
                              }}
                            />

                          )}

                          {/* NAME */}
                          <div>

                            <strong>
                              {b.ground?.name}
                            </strong>

                          </div>

                        </div>

                      </td>

                      {/* LOCATION */}
                      <td>
                        {b.ground?.location}
                      </td>

                      {/* START */}
                      <td>
                        {new Date(
                          b.startTime
                        ).toLocaleString()}
                      </td>

                      {/* END */}
                      <td>
                        {new Date(
                          b.endTime
                        ).toLocaleString()}
                      </td>

                      {/* PRICE */}
                      <td>
                        ₹{b.totalAmount}
                      </td>

                      {/* STATUS */}
                      <td>

                        <span
                          className={`badge ${getBadgeClass(status)}`}
                        >
                          {status}
                        </span>

                      </td>
                      <td>

                        {b.paymentStatus === "PAID" && (
                          <span className="badge bg-success">
                            Paid
                          </span>
                        )}

                        {b.paymentStatus === "REFUND_PENDING" && (
                          <span className="badge bg-warning text-dark">
                            Refund Pending
                          </span>
                        )}

                        {b.paymentStatus === "REFUNDED" && (
                          <span className="badge bg-info">
                            Refunded
                          </span>
                        )}

                      </td>

                      {/* ACTION */}
                      <td>

                        <button
                          className={`btn ${getButtonClass(status)}`}
                          disabled={!canCancel(b)}
                          onClick={() =>
                            cancelBooking(b.id)
                          }
                        >

                          {canCancel(b)
                            ? "Cancel"
                            : status}

                        </button>

                      </td>

                    </tr>
                  );
                })

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-4"
                  >
                    No bookings found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* ================= PAGINATION ================= */}

        {totalPages > 1 && (

          <div className="d-flex justify-content-center mt-4">

            <ul className="pagination">

              {/* PREVIOUS */}
              <li
                className={`page-item ${currentPage === 1
                  ? "disabled"
                  : ""
                  }`}
              >

                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage(currentPage - 1)
                  }
                >
                  Previous
                </button>

              </li>

              {/* PAGE NUMBERS */}
              {[...Array(totalPages)].map(
                (_, index) => (

                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1
                      ? "active"
                      : ""
                      }`}
                  >

                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage(index + 1)
                      }
                    >
                      {index + 1}
                    </button>

                  </li>
                )
              )}

              {/* NEXT */}
              <li
                className={`page-item ${currentPage === totalPages
                  ? "disabled"
                  : ""
                  }`}
              >

                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage(currentPage + 1)
                  }
                >
                  Next
                </button>

              </li>

            </ul>

          </div>

        )}

      </div>

    </div>
  );
};