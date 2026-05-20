import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserNav } from "./UserNav";
import MainNavbar from "./MainNavbar";

export const BookGround = () => {

  const [grounds, setGrounds] = useState([]);
  const [selectedGround, setSelectedGround] = useState(null);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [totalAmount, setTotalAmount] = useState(0);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [availability, setAvailability] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchGrounds();
  }, []);

  // ✅ Calculate Price
  useEffect(() => {
    if (startTime && endTime && selectedGround) {
      const start = new Date(startTime);
      const end = new Date(endTime);

      const hours = (end - start) / (1000 * 60 * 60);

      if (hours > 0) {
        setTotalAmount(hours * selectedGround.pricePerHour);
      } else {
        setTotalAmount(0);
      }
    }
  }, [startTime, endTime, selectedGround]);

  const fetchGrounds = () => {
    axios
      .get("http://localhost:8080/Allgrounds")
      .then((res) => setGrounds(res.data))
      .catch(() => alert("Error fetching grounds"));
  };

  // ✅ Open Modal + Fetch Booked Slots
  const openBooking = async (ground) => {
    setSelectedGround(ground);
    setStartTime("");
    setEndTime("");
    setAvailability("");

    try {
      const res = await axios.get(`http://localhost:8080/booking/ground/active/${ground.id}`);
      setBookedSlots(res.data);
    } catch {
      console.log("Error fetching bookings");
    }
  };

  const closeModal = () => {
    setSelectedGround(null);
    setAvailability("");
  };

  // ✅ Check Availability API
  const checkAvailability = async () => {
    try {
      if (!startTime || !endTime) {
        alert("Select start and end time first");
        return;
      }

      // ✅ NEW VALIDATION
      if (new Date(endTime) <= new Date(startTime)) {
        alert("End time must be after start time");
        return;
      }

      const res = await axios.get("http://localhost:8080/booking/check", {
        params: {
          groundId: selectedGround.id,
          startTime,
          endTime,
        },
      });

      setAvailability(res.data);

    } catch (err) {
      console.error(err);
      alert("Error checking availability");
    }
  };

  // ✅ Booking API
// ✅ Booking API
const handleBooking = async () => {

  if (availability !== "AVAILABLE") {

    alert("Please check availability first");

    return;
  }

  try {

    const user =
      JSON.parse(localStorage.getItem("userinfo"));

    if (!user) {

      alert("Please login first");

      navigate("/login");

      return;
    }

    // FINAL AMOUNT
    const finalAmount =
      Math.round(totalAmount);

    // CREATE PAYMENT ORDER
    const res = await axios.post(
      `http://localhost:8080/payment/create-order?amount=${finalAmount}`
    );

    const data = res.data;

    console.log(data);

    // CASHFREE SDK CHECK
    if (!window.Cashfree) {

      alert("Cashfree SDK not loaded");

      return;
    }

    // INITIALIZE CASHFREE
    const cashfree =
      window.Cashfree({
        mode: "sandbox"
      });

    // OPEN PAYMENT
    const paymentResult =
      await cashfree.checkout({

        paymentSessionId:
          data.payment_session_id,

        redirectTarget: "_modal"
      });

    console.log(paymentResult);

    // ✅ PAYMENT SUCCESS CHECK
    if (
      paymentResult &&
      paymentResult.error
    ) {

      alert("Payment Cancelled or Failed");

      return;
    }

    // BOOKING DATA
   const bookingData = {

  userId: user.id,

  groundId: selectedGround.id,

  startTime,

  endTime,

  paymentId: data.order_id
};

    // SAVE BOOKING ONLY AFTER SUCCESS
    await axios.post(
      "http://localhost:8080/booking/create",
      bookingData
    );

    alert(
      "Payment Successful & Booking Confirmed"
    );

    closeModal();

  } catch (err) {

    console.error(err);

    alert("Payment Failed");
  }
};

  return (
    <div>
<MainNavbar/>

      <div className="container mt-4">
        <h2 className="text-center mb-4">Book Grounds</h2>

        <div className="row">
          {grounds.map((g) => (
            <div className="col-md-4 mb-4 d-flex" key={g.id}>
              <div className="card shadow w-100">

                {/* Carousel */}
                {g.images && g.images.length > 0 ? (
                  <div className="carousel-inner">
                    <img
                      src={`http://localhost:8080/images/${g.images[0]}`}
                      className="d-block w-100"
                      style={{ height: "250px", objectFit: "cover" }}
                      alt="ground"
                    />
                  </div>
                ) : (
                  <img
                    src="https://via.placeholder.com/400x250"
                    className="d-block w-100"
                    style={{ height: "250px", objectFit: "cover" }}
                    alt="no-img"
                  />
                )}

                <div className="card-body">
                  <h5>{g.name}</h5>
                  <p>{g.location}</p>
                  <p>₹{g.pricePerHour}/hr</p>
                  <p>{g.type}</p>

                  <button
                    className="btn btn-success w-100"
                    onClick={() => openBooking(g)}
                  >
                    Book Now
                  </button>
                  <button
                    className="btn btn-primary w-100 mt-2"
                    onClick={() => navigate(`/ground/${g.id}`)}
                  >
                    View Details
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedGround && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5>Book: {selectedGround.name}</h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body">

                <label>Start Time</label>
                <input
                  type="datetime-local"
                  className="form-control mb-3"
                  min={new Date().toISOString().slice(0, 16)}
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    setEndTime(""); // ✅ reset end time
                  }}
                />

                <label>End Time</label>
                <input
                  type="datetime-local"
                  className="form-control mb-3"
                  min={startTime || new Date().toISOString().slice(0, 16)} // ✅ FIX
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />

                {/* Price */}
                <p>
                  <strong>Total Price:</strong> ₹{totalAmount}
                </p>

                {/* Availability Button */}
                <button
                  className="btn btn-warning"
                  onClick={checkAvailability}
                >
                  Check Availability
                </button>

                {/* Availability Result */}
                {availability && (
                  <p
                    className={`mt-2 ${availability === "AVAILABLE"
                        ? "text-success"
                        : "text-danger"
                      }`}
                  >
                    {availability}
                  </p>
                )}

                {/* Booked Slots */}
                <div className="mt-3">
                  <h6>Booked Slots:</h6>
                  {bookedSlots.length === 0 ? (
                    <p>No bookings yet</p>
                  ) : (
                    bookedSlots.map((b, i) => (
                      <div key={i} style={{ fontSize: "13px" }}>
                        {new Date(b.startTime).toLocaleString()} →{" "}
                        {new Date(b.endTime).toLocaleString()}
                      </div>
                    ))
                  )}
                </div>

              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleBooking}>
                  Confirm Booking
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};