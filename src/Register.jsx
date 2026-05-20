import React, { useState } from 'react'
import './css/register.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import MainNavbar from './MainNavbar';

export default function Register() {
    let [isRegistered, setIsRegistered] = useState(true);
    let navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        cnfpass: "",
        phoneno: "",
        address: ""
    });


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    let register = (e) => {

        e.preventDefault();

        // EMPTY FIELD VALIDATION
        if (
            !form.name ||
            !form.email ||
            !form.password ||
            !form.cnfpass ||
            !form.phoneno ||
            !form.address
        ) {
            alert("All fields are required");
            return;
        }

        // PASSWORD MATCH
        if (form.password !== form.cnfpass) {
            alert("Passwords do not match");
            return;
        }

        axios.post(
            "http://localhost:8080/reguser",
            form
        )
            .then((res) => {

                if (res.data === "User Registered") {

                    alert(res.data);

                    setIsRegistered(true);

                } else {
                    alert(res.data);
                }

            })
            .catch(() => {

                alert("Error In Registration..");

            });
    };


    const login = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/login", form)
            .then((res) => {
                const userinfo = res.data;

                if (!userinfo) {
                    alert("Invalid Credentials..");
                    return;
                }

                //Store User..


                localStorage.setItem("userinfo", JSON.stringify(userinfo))

                // Check Role..
                if (userinfo.role === "admin") {
                    navigate("/AdminDash")
                } else {
                    navigate("/UserDash")
                }
            })
            .catch(() => {
                alert("Login Failed..")
            })
    }
    return (
        <div>
            <MainNavbar/> 
            {isRegistered ? <div className="auth-container">
                <div className="auth-card">
                    <h2>Login</h2>

                    <input type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
                    <input type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} />

                    <button onClick={login}>Login</button>

                    <p class="switch-text">
                        Don't have an account? <span onClick={() => { setIsRegistered(false) }}>Register here</span>
                    </p>
                </div>
            </div> :
                <div className="auth-container">
                    <div className="auth-card">
                        <h2>Register</h2>

                        <input type="text" placeholder="Full Name" name="name" value={form.name} onChange={handleChange} />
                        <input type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} />
                        <input type="password" placeholder="Confirm Password" name="cnfpass" value={form.cnfpass} onChange={handleChange} />
                        <input type="text" placeholder="Phone Number" name="phoneno" value={form.phoneno} onChange={handleChange} />
                        <textarea placeholder="Address" name="address" value={form.address} onChange={handleChange}></textarea>

                        <button onClick={register}>Register</button>

                        <p className="switch-text">
                            Already have an account? <span onClick={() => { setIsRegistered(true) }}>Login here</span>
                        </p>
                    </div>
                </div>
            }

        </div>
    )
}
