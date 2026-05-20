import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PublicNav = () => {

  const navigate = useNavigate();
  const location = useLocation();

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

      <h3
        className="text-warning fw-bold"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        GroundBook
      </h3>

      {/* HIDE ON LOGIN PAGE */}
      {location.pathname !== "/registerUser" && (

        <div className="ms-auto d-flex gap-2">

          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/registerUser")}
          >
            Login
          </button>

          <button
            className="btn btn-warning"
            onClick={() => navigate("/registerUser")}
          >
            Register
          </button>

        </div>

      )}

    </nav>
  );
};

export default PublicNav;