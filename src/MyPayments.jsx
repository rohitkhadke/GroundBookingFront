import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserNav } from "./UserNav";
import MainNavbar from "./MainNavbar";

export const MyPayments = () => {

  const [payments, setPayments] = useState([]);

  useEffect(() => {

    const user =
      JSON.parse(localStorage.getItem("userinfo"));

    fetchPayments(user.id);

  }, []);

  const fetchPayments = async (userId) => {

    try {

      const res = await axios.get(
        `http://localhost:8080/booking/user/${userId}`
      );

      setPayments(res.data);

    } catch (err) {

      console.error(err);

      alert("Error loading payments");
    }
  };

  const getPaymentBadge = (status) => {

    switch(status) {

      case "PAID":
        return "bg-success";

      case "REFUND_PENDING":
        return "bg-warning text-dark";

      case "REFUNDED":
        return "bg-info";

      default:
        return "bg-secondary";
    }
  };

  return (

    <div>

     <MainNavbar/>

      <div className="container mt-4">

        <h2 className="mb-4">
          My Payments
        </h2>

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>

                <th>ID</th>
                <th>Ground</th>
                <th>Amount</th>
                <th>Payment ID</th>
                <th>Payment Status</th>
                <th>Booking Date</th>

              </tr>

            </thead>

            <tbody>

              {payments.map((p) => (

                <tr key={p.id}>

                  <td>{p.id}</td>

                  <td>
                    {p.ground?.name}
                  </td>

                  <td>
                    ₹{p.totalAmount}
                  </td>

                  <td>
                    {p.paymentId}
                  </td>

                  <td>

                    <span
                      className={`badge ${getPaymentBadge(
                        p.paymentStatus
                      )}`}
                    >
                      {p.paymentStatus}
                    </span>

                  </td>

                  <td>
                    {new Date(
                      p.createdAt
                    ).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};