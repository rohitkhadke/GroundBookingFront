import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNAv from "./AdminNAv";
import "./css/managegrounds.css";
import { useNavigate } from "react-router-dom";
import MainNavbar from "./MainNavbar";

export const ManageGrounds = () => {

  const [grounds, setGrounds] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const navigate = useNavigate();

  useEffect(() => {
    fetchGrounds();
  }, []);

  // ================= FETCH GROUNDS =================
  const fetchGrounds = () => {

    axios
      .get("http://localhost:8080/admin/grounds")
      .then((res) => setGrounds(res.data))
      .catch(() => alert("Error fetching grounds"));
  };

  // ================= MAKE INACTIVE =================
  const handleInactive = async (id) => {

    const confirmAction = window.confirm(
      "Make this ground inactive?"
    );

    if (!confirmAction) return;

    try {

      await axios.put(
        `http://localhost:8080/ground/inactive/${id}`
      );

      alert("Ground marked inactive");

      fetchGrounds();

    } catch (err) {

      console.error(err);

      alert("Failed to update status");
    }
  };

  // ================= ACTIVATE =================
  const handleActive = async (id) => {

    try {

      await axios.put(
        `http://localhost:8080/ground/active/${id}`
      );

      alert("Ground activated");

      fetchGrounds();

    } catch (err) {

      console.error(err);

      alert("Activation failed");
    }
  };

  // ================= HARD DELETE =================
  const handleHardDelete = async (id) => {

    const confirmAction = window.confirm(
      "WARNING!\n\nThis will permanently delete the ground and all related bookings.\n\nContinue?"
    );

    if (!confirmAction) return;

    try {

      await axios.delete(
        `http://localhost:8080/deleteground/${id}`
      );

      alert("Ground permanently deleted");

      fetchGrounds();

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data ||
        "Delete failed"
      );
    }
  };

  // ================= FILTER =================
  const filteredGrounds = grounds.filter((g) => {

    if (filter === "ACTIVE") {
      return g.active === true;
    }

    if (filter === "INACTIVE") {
      return g.active === false;
    }

    return true;
  });

  return (

    <div>

      <MainNavbar/>

      
      <div className="container mt-4">

        <h2 className="text-center mb-4">
          Manage Grounds
        </h2>

        {/* ================= FILTER BUTTONS ================= */}

        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">

          <button
            className={`btn ${filter === "ALL"
                ? "btn-dark"
                : "btn-outline-dark"
              }`}
            style={{ width: "140px" }}
            onClick={() => setFilter("ALL")}
          >
            All
          </button>

          <button
            className={`btn ${filter === "ACTIVE"
                ? "btn-success"
                : "btn-outline-success"
              }`}
            style={{ width: "140px" }}
            onClick={() => setFilter("ACTIVE")}
          >
            Active
          </button>

          <button
            className={`btn ${filter === "INACTIVE"
                ? "btn-secondary"
                : "btn-outline-secondary"
              }`}
            style={{ width: "140px" }}
            onClick={() => setFilter("INACTIVE")}
          >
            Inactive
          </button>

        </div>

        <div className="row">

          {filteredGrounds.length > 0 ? (

            filteredGrounds.map((g) => (

              <div
                className="col-md-4 mb-4 d-flex"
                key={g.id}
              >

                <div className="card shadow w-100 ground-card">

                  {/* ================= CAROUSEL ================= */}

                  {g.images && g.images.length > 0 ? (

                    <div
                      id={`carousel${g.id}`}
                      className="carousel slide"
                      data-bs-ride="carousel"
                      data-bs-interval="2500"
                    >

                      {/* INDICATORS */}
                      {g.images.length > 1 && (

                        <div className="carousel-indicators">

                          {g.images.map((_, index) => (

                            <button
                              key={index}
                              type="button"
                              data-bs-target={`#carousel${g.id}`}
                              data-bs-slide-to={index}
                              className={index === 0 ? "active" : ""}
                            ></button>

                          ))}

                        </div>
                      )}

                      {/* IMAGES */}
                      <div className="carousel-inner">

                        {g.images.map((img, index) => (

                          <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""
                              }`}
                          >

                            <img
                              src={`http://localhost:8080/images/${img}`}
                              className="d-block w-100"
                              style={{
                                height: "250px",
                                objectFit: "cover",
                              }}
                              alt="ground"
                            />

                          </div>

                        ))}

                      </div>

                      {/* CONTROLS */}
                      {g.images.length > 1 && (

                        <>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carousel${g.id}`}
                            data-bs-slide="prev"
                          >
                            <span className="carousel-control-prev-icon"></span>
                          </button>

                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carousel${g.id}`}
                            data-bs-slide="next"
                          >
                            <span className="carousel-control-next-icon"></span>
                          </button>
                        </>
                      )}

                    </div>

                  ) : (

                    <img
                      src="https://via.placeholder.com/400x250?text=No+Image"
                      className="d-block w-100"
                      style={{
                        height: "250px",
                        objectFit: "cover",
                      }}
                      alt="no-img"
                    />

                  )}

                  {/* ================= BODY ================= */}

                  <div className="card-body d-flex flex-column">

                    <h5>
                      <strong>{g.name}</strong>
                    </h5>

                    <p>
                      <strong>Location:</strong> {g.location}
                    </p>

                    <p>
                      <strong>Charges:</strong><br />
                      ₹{g.pricePerHour}/hr |
                      ₹{g.pricePerDay}/day
                    </p>

                    <p>
                      <strong>Type:</strong> {g.type}
                    </p>

                    <p className="ground-desc">
                      <strong>Description:</strong><br />
                      {g.description}
                    </p>

                    {/* STATUS */}
                    <p>

                      <strong>Status:</strong>{" "}

                      {g.active ? (

                        <span className="badge bg-success">
                          ACTIVE
                        </span>

                      ) : (

                        <span className="badge bg-secondary">
                          INACTIVE
                        </span>

                      )}

                    </p>

                    {/* ================= BUTTONS ================= */}

                    {/* ================= BUTTONS ================= */}

                    <div className="mt-auto">

                      {/* TOP ROW */}
                      <div className="d-flex gap-2 mb-2">

                        {/* VIEW DETAILS */}
                        <button
                          className="btn btn-primary flex-fill"
                          onClick={() =>
                            navigate(`/ground/${g.id}`)
                          }
                        >
                          View Details
                        </button>

                        {/* UPDATE */}
                        <button
                          className="btn btn-warning flex-fill"
                          onClick={() =>
                            navigate(`/update-ground/${g.id}`)
                          }
                        >
                          Update
                        </button>

                      </div>

                      {/* SECOND ROW */}
                      <div className="d-flex gap-2">

                        {/* ACTIVE / INACTIVE */}
                        {g.active ? (

                          <button
                            className="btn btn-secondary flex-fill"
                            onClick={() =>
                              handleInactive(g.id)
                            }
                          >
                            Make Inactive
                          </button>

                        ) : (

                          <button
                            className="btn btn-success flex-fill"
                            onClick={() =>
                              handleActive(g.id)
                            }
                          >
                            Activate
                          </button>

                        )}

                        {/* HARD DELETE */}
                        <button
                          className="btn btn-danger flex-fill"
                          onClick={() =>
                            handleHardDelete(g.id)
                          }
                        >
                          Hard Delete
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="text-center mt-5">
              <h5>No grounds found</h5>
            </div>

          )}

        </div>

      </div>

    </div>
  );
};