import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function GameCreatePage() {

    const [name, setName] = useState("");
    const [environmentId, setEnvironmentId] = useState("");
    const [userIds, setUserIds] = useState([]);
    const { isAuthenticated, user, login, logout} = useAuth();
    let navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        const gamePayload = {
            name,
            dm_id: user.id,
            environment_id: environmentId,
            start_date: new Date().toISOString()
        };

        try {
            const gameResponse = await fetch(`${import.meta.env.VITE_API_SERVER_BASE}/games`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gamePayload),
            });

            if (!gameResponse.ok) {
                throw new Error("Failed to create game");
            }

            const gameData = await gameResponse.json();
            console.log(`game data is ${JSON.stringify(gameData)}`)
            const gameId = gameData.id;
            console.log(`game ID is ${gameId}`)

            const updatedUserIds = [...userIds];
            //check to ensure dm id not already there
            if (user && !updatedUserIds.includes(user.id.toString())) {
                console.log(`adding user id: ${user.id}`)
                updatedUserIds.push(user.id.toString());
            }

            const userGame = updatedUserIds.map(userId => {
                return fetch(`${import.meta.env.VITE_API_SERVER_BASE}/user_games`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: userId, game_id: gameId }),
                });
            });

            await Promise.all(userGame);

            alert("Game created and associated with users successfully!");
            navigate('/profile');

        } catch (error) {
            console.error("Error submitting data:", error);
            alert("An error occurred while submitting the form.");
        }
    };


    if (isAuthenticated && user.role == 1) {
        return (
            <div className="game-create-main" style={{marginTop: 95}}>
                <div className="create-container">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                Game Name:
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Environment ID:
                                <input
                                    type="number"
                                    value={environmentId}
                                    onChange={(e) => setEnvironmentId(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                User IDs (comma-separated):
                                <input
                                    type="text"
                                    value={userIds.join(',')}
                                    onChange={(e) => setUserIds(e.target.value.split(',').map(id => id.trim()))}
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit">Create Game</button>
                    </form>
                </div>
            </div>
        )
    }else {
        //hacky
        {navigate('/home')}
    }
}