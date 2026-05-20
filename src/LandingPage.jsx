import React from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "./MainNavbar";

const LandingPage = () => {

  const navigate = useNavigate();

  return (

    <div>
      <MainNavbar/>


      {/* ================= HERO SECTION ================= */}

      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >

        <div className="container">

          <div className="row">

            <div className="col-lg-7">

              <h1
                className="fw-bold display-3 mb-4"
                style={{ lineHeight: "1.2" }}
              >
                Book Sports Grounds <br />
                Anytime, Anywhere
              </h1>

              <p
                className="lead mb-4"
                style={{ maxWidth: "650px" }}
              >
                Find and book cricket turfs, football grounds,
                badminton courts and more with real-time
                availability, secure payments and instant booking.
              </p>

              <div className="d-flex gap-3 flex-wrap">

                <button
                  className="btn btn-warning btn-lg px-4 fw-bold"
                  onClick={() => navigate("/registerUser")}
                >
                  Get Started
                </button>

                <button
                  className="btn btn-outline-light btn-lg px-4"
                  onClick={() => navigate("/about-us")}
                >
                  Learn More
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= FEATURES ================= */}

      <div className="container py-5">

        <div className="text-center mb-5">

          <h2 className="fw-bold">
            Why Choose GroundBook?
          </h2>

          <p className="text-muted">
            Fast, secure and hassle-free sports ground booking
          </p>

        </div>

        <div className="row g-4">

          <div className="col-md-3">

            <div className="card shadow border-0 h-100 text-center p-4">

              <div
                style={{ fontSize: "50px" }}
                className="mb-3"
              >
                ⚡
              </div>

              <h5 className="fw-bold">
                Instant Booking
              </h5>

              <p className="text-muted">
                Book grounds instantly with real-time
                slot availability.
              </p>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow border-0 h-100 text-center p-4">

              <div
                style={{ fontSize: "50px" }}
                className="mb-3"
              >
                💳
              </div>

              <h5 className="fw-bold">
                Secure Payments
              </h5>

              <p className="text-muted">
                Safe online payments with Cashfree
                integration.
              </p>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow border-0 h-100 text-center p-4">

              <div
                style={{ fontSize: "50px" }}
                className="mb-3"
              >
                🏟️
              </div>

              <h5 className="fw-bold">
                Multiple Sports
              </h5>

              <p className="text-muted">
                Cricket, football, badminton,
                volleyball and more.
              </p>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow border-0 h-100 text-center p-4">

              <div
                style={{ fontSize: "50px" }}
                className="mb-3"
              >
                🔄
              </div>

              <h5 className="fw-bold">
                Refund Support
              </h5>

              <p className="text-muted">
                Easy booking cancellation and
                admin refund management.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= SPORTS SECTION ================= */}

      <div
        className="py-5"
        style={{ background: "#f8f9fa" }}
      >

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              Available Sports Grounds
            </h2>

          </div>

          <div className="row g-4">

            <div className="col-md-3">

              <div className="card border-0 shadow overflow-hidden">

                <img
                  src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2070&auto=format&fit=crop"
                  alt="Cricket"
                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body text-center">

                  <h5 className="fw-bold">
                    Cricket Turf
                  </h5>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow overflow-hidden">

                <img
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070&auto=format&fit=crop"
                  alt="Football"
                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body text-center">

                  <h5 className="fw-bold">
                    Football Ground
                  </h5>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow overflow-hidden">

                <img
                  src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1974&auto=format&fit=crop"
                  alt="Badminton"
                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body text-center">

                  <h5 className="fw-bold">
                    Badminton Court
                  </h5>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow overflow-hidden">

                <img
                  src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop"
                  alt="Tennis"
                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body text-center">

                  <h5 className="fw-bold">
                    Tennis Court
                  </h5>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= FOOTER ================= */}

      <footer
        className="text-center text-light py-4"
        style={{ background: "#111" }}
      >

        <h5 className="text-warning fw-bold">
          GroundBook
        </h5>

        <p className="mb-1">
          Your complete sports ground booking platform
        </p>

        <small>
          © 2026 GroundBook. All Rights Reserved.
        </small>

      </footer>

    </div>
  );
};

export default LandingPage;