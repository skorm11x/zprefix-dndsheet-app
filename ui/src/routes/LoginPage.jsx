import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router";


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
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");

    const { isAuthenticated, user, login, logout} = useAuth();
    let navigate = useNavigate();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };

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
            //${import.meta.env.VITE_API_SERVER_BASE}
            //http://localhost:3000
            fetch(`${import.meta.env.VITE_API_SERVER_BASE}/users`, {
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
                    if(data.status == "SUCCESS"){
                      console.log("Login successful:", data);
                      alert("Registration successful!");
                      login(data.username);
                      console.log(isAuthenticated);
                      navigate('/home');
                    } else{
                        if(data.error == "Username already exists!"){
                            setSnackbarMsg("Username is already taken!");
                            setSnackbar(true);
                        } else{
                            console.log("Register FAILURE:", data);
                            alert("REGISTER FAILURE!");
                        }
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
            //${import.meta.env.VITE_API_SERVER_BASE}
            fetch(`${import.meta.env.VITE_API_SERVER_BASE}/login`, {
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
                    if(data.status == "SUCCESS"){
                      console.log(`Login successful: ${username} currently auth: ${isAuthenticated}`);
                      alert(`Login successful! for ${username}`);
                      login(data.user);
                      navigate('/home');
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

    useEffect(() => {
        setFname("");
        setLname("");
        setHandle("");
        setUsername("");
        setEmail("");
        setPassword("");
        setRole(0);
        console.log(`Authentication status changed: ${isAuthenticated}`);
    }, [authType, isAuthenticated]);

    return (
        <div className="auth-page">
            <div className="container">
                <h1>{authType === "login" ? "Login" : "Register"}</h1>
                <form className="form" onSubmit={handleSubmit}>
                    {authType === "register" && (
                        <>
                            <div className="form-group"><input type="text" value={fname} onChange={(e) => setFname(e.target.value)} placeholder="First Name" required /></div>
                            <div className="form-group"><input type="text" value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Last Name" required /></div>
                            <div className="form-group"><input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="Handle" required /></div>
                            <div className="form-group"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /></div>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="radio"
                                        value="1"
                                        checked={role === "1"}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    Dungeon Master Account
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="0"
                                        checked={role === "0"}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    Player Character Account
                                </label>
                            </div>
                        </>
                    )}
                     <div className="form-group"><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required /></div>
                     <div className="form-group"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required /></div>
                    <button type="submit" className="form-button">{authType === "login" ? "Login" : "Create Account"}</button>
                </form>
                <div className="register-login-option">
                    <button
                        type="button"
                        className="switch-btn"
                        onClick={() => { setAuthType(authType === "login" ? "register" : "login");}}
                    >
                        {authType === "login" ? "Need an account? Register here" : "Have an account? Login here"}
                    </button>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Username is already Taken!"
            />
        </div>
    );
}

export default Login;
