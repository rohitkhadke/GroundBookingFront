import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/manageusers.css";
import AdminNAv from "./AdminNAv";
import MainNavbar from "./MainNavbar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Load all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/allusers");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Search users
  const handleSearch = async () => {
    try {
      if (search.trim() === "") {
        fetchUsers();
        return;
      }

      const res = await axios.get(
        `http://localhost:8080/search?keyword=${search}`
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // View bookings of a user
  const viewBookings = async (user) => {
    try {
      setSelectedUser(user);

      const res = await axios.get(
        `http://localhost:8080/booking/user/${user.id}`
      );

      setBookings(res.data);
    } catch (err) {
      console.error("Booking fetch error:", err);
    }
  };

  return (
    <div>
      <MainNavbar />

      <div className="manage-container">

        <h2 className="title">👥 Manage Users</h2>

        {/* Search Box */}
        <div className="search-box">
          <input
            type="text"
            style={{ width: "500px" }}
            placeholder="Search user..."
            value={search}

            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Users Table */}
        <div className="table-container">
          <table >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => viewBookings(u)}
                    >
                      View Bookings
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bookings Section */}
        {selectedUser && (
          <div className="booking-box">
            <h3>📋 Bookings of {selectedUser.name}</h3>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ground</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.ground?.name}</td>
                    <td>{b.startTime}</td>
                    <td>{b.endTime}</td>
                    <td>{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;