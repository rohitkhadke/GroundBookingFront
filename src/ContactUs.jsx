import React, { useState } from "react";
import axios from "axios";
import "./css/contactus.css";
import { UserNav } from "./UserNav";
import MainNavbar from "./MainNavbar";

const ContactUs = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            await axios.post("http://localhost:8080/api/contact", form);
            setStatus("✅ Message sent successfully!");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            setStatus("❌ Failed to send message");
        }
    };

    return (

        <div>
<MainNavbar/>

            <div className="contact-page">

                <div className="contact-card">

                    {/* LEFT INFO */}
                    <div className="contact-left">
                        <h2>Get in Touch</h2>
                        <p>Have questions or want to book a ground? Reach out to us!</p>

                        <div className="info">
                            <p>📍 Pune, India</p>
                            <p>📞 +91 987654321 (Dummy)</p>
                            <p>📧 Rohitkhadke05@gmail.com</p>
                        </div>

                        <div className="map">
                            <iframe
                                src="https://maps.google.com/maps?q=Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                title="map"
                            ></iframe>
                        </div>
                    </div>

                    {/* RIGHT FORM */}
                    <div className="contact-right">
                        <h2>Send Message</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                                <label>Your Name</label>
                            </div>

                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label>Your Email</label>
                            </div>

                            <div className="input-group">
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                <label>Your Message</label>
                            </div>

                            <button type="submit">Send Message</button>
                        </form>

                        {status && <p className="status">{status}</p>}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default ContactUs;