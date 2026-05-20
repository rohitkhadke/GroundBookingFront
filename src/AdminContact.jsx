import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/admincontact.css";
import AdminNAv from "./AdminNAv";
import MainNavbar from "./MainNavbar";

const AdminContact = () => {
    const [messages, setMessages] = useState([]);

    // fallback for null status
    const getStatus = (status) => status || "NEW";

    const fetchMessages = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/contact");
            setMessages(res.data);
        } catch (err) {
            console.error("Error fetching messages", err);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const deleteMsg = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/contact/${id}`);
            fetchMessages();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const markRead = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/contact/${id}/read`);
            fetchMessages();
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    const unreadCount = messages.filter(
        (m) => getStatus(m.status) === "NEW"
    ).length;

    return (

        <div>
   <MainNavbar/>

            <div className="admin-page">

                {/* HEADER */}
                <div className="admin-header">
                    <h1>Contact Messages</h1>
                    <p>
                        {messages.length} total • {unreadCount} unread
                    </p>
                </div>

                {/* GRID */}
                <div className="card-grid">
                    {messages.map((msg) => {
                        const status = getStatus(msg.status);

                        return (
                            <div className="message-card" key={msg.id}>

                                <div className="card-top">
                                    <div>
                                        <h3>{msg.name}</h3>
                                        <span className="email">{msg.email}</span>
                                    </div>

                                    <span className={`badge ${status.toLowerCase()}`}>
                                        {status}
                                    </span>
                                </div>

                                <p className="message-text">{msg.message}</p>

                                <div className="card-actions">
                                    {status === "NEW" && (
                                        <button
                                            className="btn secondary"
                                            onClick={() => markRead(msg.id)}
                                        >
                                            Mark as Read
                                        </button>
                                    )}

                                    <button
                                        className="btn danger"
                                        onClick={() => deleteMsg(msg.id)}
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default AdminContact;