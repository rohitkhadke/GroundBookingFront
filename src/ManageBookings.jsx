import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminNAv from "./AdminNAv";
import MainNavbar from "./MainNavbar";

export const ManageBookings = () => {

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // SORT FILTER
  const [sortType, setSortType] = useState("latest");

  // STATUS FILTER
  const [statusFilter, setStatusFilter] = useState("ALL");

  const bookingsPerPage = 20;

  // ================= FETCH BOOKINGS =================
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/booking/all"
      );

      setBookings(res.data);

    } catch (err) {

      console.error(err);
      alert("Error fetching bookings");
    }
  };

  // ================= CANCEL BOOKING =================
  const cancelBooking = async (bookingId) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {

      await axios.put(
        `http://localhost:8080/booking/cancel/${bookingId}`
      );

      alert("Booking cancelled successfully");

      fetchBookings();

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data ||
        "Cancel failed"
      );
    }
  };
  // ================ Refund Booking ============================
  const refundBooking = async (bookingId) => {

    const confirmRefund = window.confirm(
      "Approve refund for this booking?"
    );

    if (!confirmRefund) return;

    try {

      await axios.put(
        `http://localhost:8080/booking/refund/${bookingId}`
      );

      alert("Refund completed successfully");

      fetchBookings();

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data ||
        "Refund failed"
      );
    }
  };

  // ================= DISPLAY STATUS =================
  const getDisplayStatus = (b) => {

    const now = new Date();

    const start = new Date(b.startTime);
    const end = new Date(b.endTime);

    // CANCELLED
    if (b.status === "CANCELLED") {
      return "CANCELLED";
    }

    // COMPLETED
    if (b.status === "COMPLETED") {
      return "COMPLETED";
    }

    // STARTED
    if (start <= now && end >= now) {
      return "STARTED";
    }

    // AUTO COMPLETED
    if (end < now) {
      return "COMPLETED";
    }

    // FUTURE BOOKING
    return "BOOKED";
  };

  // ================= STATUS BADGE =================
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

  // ================= CANCEL LOGIC =================
  const canCancel = (b) => {

    const status = getDisplayStatus(b);

    return status === "BOOKED";
  };

  // ================= SEARCH + FILTER + SORT =================
  const filteredBookings = useMemo(() => {

    let filtered = bookings.filter((b) => {

      const userName =
        b.user?.name?.toLowerCase() || "";

      const groundName =
        b.ground?.name?.toLowerCase() || "";

      const matchesSearch =
        userName.includes(search.toLowerCase()) ||
        groundName.includes(search.toLowerCase());

      const status = getDisplayStatus(b);

      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // SORTING
    switch (sortType) {

      case "latest":

        filtered.sort(
          (a, b) =>
            new Date(b.startTime) -
            new Date(a.startTime)
        );

        break;

      case "oldest":

        filtered.sort(
          (a, b) =>
            new Date(a.startTime) -
            new Date(b.startTime)
        );

        break;

      case "upcoming":

        filtered.sort(
          (a, b) =>
            new Date(a.startTime) -
            new Date(b.startTime)
        );

        break;

      default:
        break;
    }

    return filtered;

  }, [
    bookings,
    search,
    sortType,
    statusFilter
  ]);

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

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2>Manage Bookings</h2>

          {/* CONTROLS */}
          <div className="d-flex gap-2">

            {/* SEARCH */}
            <input
              type="text"
              className="form-control"
              placeholder="Search by user or ground"
              value={search}
              style={{ width: "300px" }}
              onChange={(e) => {

                setSearch(e.target.value);
                setCurrentPage(1);

              }}
            />

            {/* SORT */}
            <select
              className="form-select"
              value={sortType}
              onChange={(e) =>
                setSortType(e.target.value)
              }
            >

              <option value="latest">
                Latest First
              </option>

              <option value="oldest">
                Oldest First
              </option>

              <option value="upcoming">
                Upcoming First
              </option>

            </select>

            {/* STATUS FILTER */}
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => {

                setStatusFilter(e.target.value);
                setCurrentPage(1);

              }}
            >

              <option value="ALL">
                All Status
              </option>

              <option value="BOOKED">
                Booked
              </option>

              <option value="STARTED">
                Started
              </option>

              <option value="COMPLETED">
                Completed
              </option>

              <option value="CANCELLED">
                Cancelled
              </option>

            </select>

          </div>

        </div>

        {/* TABLE */}
        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>

                <th>ID</th>
                <th>User</th>
                <th>Ground</th>
                <th>Location</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {currentBookings.length > 0 ? (

                currentBookings.map((b) => {

                  const status =
                    getDisplayStatus(b);

                  return (

                    <tr key={b.id}>

                      {/* ID */}
                      <td>{b.id}</td>

                      {/* USER */}
                      <td>
                        {b.user?.name}
                      </td>

                      {/* GROUND */}
                      <td>
                        {b.ground?.name}
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

                      {/* TOTAL */}
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

                      {/* ACTION */}
                      <td>

                        {b.paymentStatus === "REFUND_PENDING" ? (

                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => refundBooking(b.id)}
                          >
                            Approve Refund
                          </button>

                        ) : (

                          <button
                            type="button"
                            className={`btn ${canCancel(b)
                                ? "btn-danger"
                                : "btn-secondary"
                              }`}
                            disabled={!canCancel(b)}
                            onClick={() =>
                              cancelBooking(b.id)
                            }
                          >

                            {canCancel(b)
                              ? "Cancel"
                              : status}

                          </button>

                        )}

                      </td>

                    </tr>
                  );
                })

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="text-center"
                  >

                    No bookings found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
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
                    setCurrentPage(
                      currentPage - 1
                    )
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
                        setCurrentPage(
                          index + 1
                        )
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
                    setCurrentPage(
                      currentPage + 1
                    )
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