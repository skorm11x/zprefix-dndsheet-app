import { useState } from 'react';
import { useNavigate } from "react-router";

import './EnvCreatePage.css';

export default function EnvCreatePage() {
    const [environment, setEnvironment] = useState("");

    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEnvironment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Env submitted:', environment);

        try {

            const payload = {
                name: environment.name
            };

            const response = await fetch(`${import.meta.env.VITE_API_SERVER_BASE}/environments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to create character");
            }

            const data = await response.json();
            if(data.status == "SUCCESS"){
                console.log(`environment creation successful!`);
                alert("Environment creation success");
                navigate('/environments');
            }

        } catch(error) {
            console.error("Error env create in:", error);
            alert("Failed to Create. Please try again.");
        }
    }

    return (
        <div className="environment-sheet">
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <div className="form-group">
                        <label htmlFor="name">Environment Name</label>
                        <input type="text" id="name" name="name" value={environment.name} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" className="submit-btn">Create Environment</button>
            </form>
        </div>

    )
}