import React from "react";
import MainNavbar from "./MainNavbar";

const AboutUs = () => {

  return (

    <div>

      <MainNavbar />

      {/* HERO SECTION */}
      <div
        className="text-white d-flex align-items-center"
        style={{
          height: "55vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <div className="container text-center">

          <h1 className="display-3 fw-bold mb-3">
            About GroundBook
          </h1>

          <p
            className="lead mx-auto"
            style={{ maxWidth: "800px" }}
          >
            Your complete sports ground booking platform
            built for players, teams and sports lovers.
          </p>

        </div>

      </div>

      {/* ABOUT SECTION */}
      <div className="container py-5">

        <div className="row align-items-center g-5">

          <div className="col-lg-6">

            <img
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070&auto=format&fit=crop"
              alt="sports"
              className="img-fluid rounded shadow"
            />

          </div>

          <div className="col-lg-6">

            <h2 className="fw-bold mb-4">
              Who We Are
            </h2>

            <p className="text-muted fs-5">

              GroundBook is a modern sports ground
              booking platform that allows users
              to discover and book cricket turfs,
              football grounds, badminton courts
              and many other sports venues with ease.

            </p>

            <p className="text-muted fs-5">

              We aim to simplify the entire booking
              experience with real-time availability,
              secure online payments and easy
              booking management.

            </p>

            <div className="row mt-4">

              <div className="col-6 mb-3">

                <div className="card border-0 shadow text-center p-4">

                  <h3 className="fw-bold text-warning">
                    100+
                  </h3>

                  <p className="mb-0">
                    Grounds Listed
                  </p>

                </div>

              </div>

              <div className="col-6 mb-3">

                <div className="card border-0 shadow text-center p-4">

                  <h3 className="fw-bold text-warning">
                    5000+
                  </h3>

                  <p className="mb-0">
                    Happy Users
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* WHY CHOOSE US */}
      <div
        className="py-5"
        style={{ background: "#f8f9fa" }}
      >

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              Why Choose Us?
            </h2>

            <p className="text-muted">
              Everything you need for seamless sports booking
            </p>

          </div>

          <div className="row g-4">

            <div className="col-md-4">

              <div className="card border-0 shadow h-100 text-center p-4">

                <div style={{ fontSize: "55px" }}>
                  ⚡
                </div>

                <h4 className="fw-bold mt-3">
                  Fast Booking
                </h4>

                <p className="text-muted">

                  Book your favorite grounds instantly
                  with real-time slot availability.

                </p>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card border-0 shadow h-100 text-center p-4">

                <div style={{ fontSize: "55px" }}>
                  💳
                </div>

                <h4 className="fw-bold mt-3">
                  Secure Payments
                </h4>

                <p className="text-muted">

                  Safe and reliable payment integration
                  for hassle-free transactions.

                </p>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card border-0 shadow h-100 text-center p-4">

                <div style={{ fontSize: "55px" }}>
                  🏟️
                </div>

                <h4 className="fw-bold mt-3">
                  Multiple Sports
                </h4>

                <p className="text-muted">

                  Cricket, football, badminton,
                  tennis and much more.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TEAM SECTION */}
      <div className="container py-5">

        <div className="text-center mb-5">

          <h2 className="fw-bold">
            Our Mission
          </h2>

        </div>

        <div className="row justify-content-center">

          <div className="col-lg-9">

            <div className="card border-0 shadow p-5 text-center">

              <p
                className="fs-4 text-muted"
                style={{ lineHeight: "1.8" }}
              >

                Our mission is to make sports
                accessible to everyone by connecting
                players with high-quality sports venues
                through a fast, simple and modern platform.

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer
        className="text-center text-light py-4"
        style={{ background: "#111" }}
      >

        <h5 className="text-warning fw-bold">
          GroundBook
        </h5>

        <p className="mb-1">
          Play More. Book Faster.
        </p>

        <small>
          © 2026 GroundBook. All Rights Reserved.
        </small>

      </footer>

    </div>
  );
};

export default AboutUs;