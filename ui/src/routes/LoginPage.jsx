import React, { useState } from "react";
import { useAuth } from '../context/AuthContext';
import env from "react-dotenv";

import './Login.css';

function Login() {
    const [authType, setAuthType] = useState("login");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [handle, setHandle] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(0);
    const { isAuthenticated, user, login, logout} = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        let payload  = {};
        if(authType == "register"){
            if (!email || !password || !fname || !lname || !handle || !username || !role) {
                alert("Please fill out all fields.");
                return;
            }
            payload = {
                fname, lname, handle, username,
                email, password, role
            };

            fetch(`${env.API_SERVER_BASE}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to Register user");
                    }
                    return response.json();
                })
                .then((data) => {
                    if(data.authenticated == true){
                      console.log("Login successful:", data);
                      alert("Registration successful!");
                      login(data.email);
                      console.log(isAuthenticated);
                    } else{
                      console.log("Register FAILURE:", data);
                      alert("REGISTER FAILURE!");
                    }
                })
                .catch((error) => {
                    console.error("Error Register in:", error);
                    alert("Failed to REgister. Please try again.");
                });

        } else{
            if (!password || !username) {
                alert("Please fill out all fields.");
                return;
            }
            payload = {
                username, password
            };

            fetch(`${env.API_SERVER_BASE}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to log in");
                    }
                    return response.json();
                })
                .then((data) => {
                    if(data.authenticated == true){
                      console.log("Login successful:", data);
                      alert("Login successful!");
                      login(data.email);
                      console.log(isAuthenticated);
                    } else{
                      console.log("Login FAILURE:", data);
                      alert("Login FAILURE!");
                    }
                })
                .catch((error) => {
                    console.error("Error logging in:", error);
                    alert("Failed to log in. Please try again.");
                });
        }

    };

    if(authType == "login"){
        return (
            <div className="auth-page">
                <div className="container">
                <h1>Register</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                required
                            />
                        </div>
                        <button type="submit" className="form__custom-button">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    } else{
        return (
            <div className="auth-page">
                <div className="container">
                    <h1>Register</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="fname"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                placeholder="Enter first name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="lname"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                placeholder="Enter last name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="handle"
                                value={handle}
                                onChange={(e) => setHandle(e.target.value)}
                                placeholder="Enter handle"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                required
                            />
                        </div>
                        <button type="submit" className="form__custom-button">
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        );
    }

}

export default Login;
