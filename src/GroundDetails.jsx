import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import MainNavbar from "./MainNavbar";

export const GroundDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [ground, setGround] = useState(null);


  useEffect(() => {
    fetchGround();
  }, []);

  const fetchGround = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/ground/${id}`
      );
      setGround(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching ground details");
    }
  };

  if (!ground) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div>
      <MainNavbar />

      <div className="container mt-4">

        <button
          className="btn btn-secondary mb-3"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="card shadow">

          {/* IMAGE CAROUSEL */}
          {ground.images && ground.images.length > 0 && (
            <div
              id="carouselExample"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {ground.images.map((img, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={`http://localhost:8080/images/${img}`}
                      className="d-block w-100"
                      style={{ height: "400px", objectFit: "cover" }}
                      alt="ground"
                    />
                  </div>
                ))}
              </div>

              {/* Controls */}
              {ground.images.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon"></span>
                  </button>

                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon"></span>
                  </button>
                </>
              )}
            </div>
          )}

          {/* DETAILS */}
          <div className="card-body">

            <h3>{ground.name}</h3>

            <p><strong>Location:</strong> {ground.location}</p>
            <p><strong>Type:</strong> {ground.type}</p>

            <p>
              <strong>Price:</strong> ₹{ground.pricePerHour}/hr |
              ₹{ground.pricePerDay}/day
            </p>

            <p><strong>Description:</strong></p>
            <p>{ground.description}</p>

          </div>
        </div>

      </div>
    </div>
  );
};