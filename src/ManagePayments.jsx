import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminNAv from "./AdminNAv";
import MainNavbar from "./MainNavbar";

export const ManagePayments = () => {

  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/booking/all"
      );

      setPayments(res.data);

    } catch (err) {

      console.error(err);

      alert("Error loading payments");
    }
  };

  const refundPayment = async (bookingId) => {

    try {

      await axios.put(
        `http://localhost:8080/booking/refund/${bookingId}`
      );

      alert("Refund approved");

      fetchPayments();

    } catch (err) {

      console.error(err);

      alert("Refund failed");
    }
  };

  const filteredPayments = useMemo(() => {

    return payments.filter((p) => {

      const user =
        p.user?.name?.toLowerCase() || "";

      const ground =
        p.ground?.name?.toLowerCase() || "";

      return (
        user.includes(search.toLowerCase()) ||
        ground.includes(search.toLowerCase())
      );
    });

  }, [payments, search]);

  const getBadge = (status) => {

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

        <div className="d-flex justify-content-between mb-4">

          <h2>
            Manage Payments
          </h2>

          <input
            type="text"
            placeholder="Search"
            className="form-control"
            style={{ width: "300px" }}
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>

                <th>ID</th>
                <th>User</th>
                <th>Ground</th>
                <th>Amount</th>
                <th>Payment ID</th>
                <th>Status</th>
                <th>Refund Date</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredPayments.map((p) => (

                <tr key={p.id}>

                  <td>{p.id}</td>

                  <td>{p.user?.name}</td>

                  <td>{p.ground?.name}</td>

                  <td>₹{p.totalAmount}</td>

                  <td>{p.paymentId}</td>

                  <td>

                    <span
                      className={`badge ${getBadge(
                        p.paymentStatus
                      )}`}
                    >
                      {p.paymentStatus}
                    </span>

                  </td>

                  <td>

                    {p.refundedAt
                      ? new Date(
                          p.refundedAt
                        ).toLocaleString()
                      : "-"}

                  </td>

                  <td>

                    {p.paymentStatus ===
                    "REFUND_PENDING" ? (

                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          refundPayment(p.id)
                        }
                      >
                        Approve Refund
                      </button>

                    ) : (

                      <span>-</span>

                    )}

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