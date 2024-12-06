import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Container, Paper, Box, Avatar, Typography,
     Divider, List, ListItem, ListItemText, Button } from '@mui/material';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ProfilePage() {
    const { isAuthenticated, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [userGames, setUserGames] = useState([]); //holds all the games the dm is with
    const [games, setGames] = useState([]); //holds all the game specific info
    const [gameUsers, setGameUsers] = useState({}); //holds all the users per game e.g. 1: {1,2,3}
    const [editingGame, setEditingGame] = useState(null);

    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const editGame = (game) => {
        setEditingGame(game);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const fetchUserGames = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_SERVER_BASE}/user_games?user_id=${user.id}`);
            if (!response.ok) {
                throw new Error("Network error!");
            }
            const data = await response.json();
            console.log(`user_games data is ${JSON.stringify(data)}`)

            if (data.length > 0) {
                setUserGames(data);
                await fetchGameDetails(data.map(game => game.game_id));
                await fetchUsersForGames(data.map(game => game.game_id));
            }

        } catch(err) {
            console.error("Error users games:", err);
        }
    };

    const fetchGameDetails = async (gameIds) => {
        console.log(`game ids is ${gameIds}`);
        try {
            const responses = await Promise.all(gameIds.map(id => 
                fetch(`${import.meta.env.VITE_API_SERVER_BASE}/games?id=${id}`)
            ));
            
            const gamesData = await Promise.all(responses.map(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch game details");
                }
                return response.json();
            }));

            const flattenedGamesData = [].concat(...gamesData);
            console.log(`Flattened game data is ${JSON.stringify(flattenedGamesData)}`);
            setGames(flattenedGamesData);
        } catch (err) {
            console.error("Error fetching game details:", err);
        }
    };

    const fetchUsersForGames = async (gameIds) => {
        try {
            const responses = await Promise.all(gameIds.map(id => 
                fetch(`${import.meta.env.VITE_API_SERVER_BASE}/user_games?game_id=${id}`)
            ));
            
            const usersData = await Promise.all(responses.map(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users for games");
                }
                return response.json();
            }));

            const usersByGameId = {};
            gameIds.forEach((id, index) => {
                usersByGameId[id] = usersData[index].filter(user => user.user_id !== user.id); 
            });

            console.log(`Users by Game ID: ${JSON.stringify(usersByGameId)}`);
            setGameUsers(usersByGameId);
        } catch (err) {
            console.error("Error fetching users for games:", err);
        }
    };

    const deleteGame = async (gameId) => {
        console.log(`starting to delete game: ${gameId}`);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_SERVER_BASE}/games?id=${gameId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(`${JSON.stringify(response)}`)

            if (!response.ok) {
                throw new Error("Failed to delete game");
            }

            alert("Game deleted successfully!");
            await fetchUserGames();

        } catch (error) {
            console.error("Error deleting game:", error);
            alert("An error occurred while deleting the game.");
        }
    };

    const handleSubmitEdit = async () => {
        const updatedData = {
            name: editingGame.name,
            environment_id: editingGame.environment_id,
            start_date: editingGame.start_date
          };

          console.log(`uodated data is ${JSON.stringify(updatedData)}`)
        
        try {
          const response = await fetch(`${import.meta.env.VITE_API_SERVER_BASE}/games?id=${editingGame.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          });
          
          if (!response.ok) {
            throw new Error("Failed to edit game");
          }
          
          alert("Game updated successfully!");
          setOpen(false);
          fetchUserGames();
        } catch (error) {
          console.error("Error editing game:", error);
          alert("An error occurred while editing the game.");
        }
    };


    useEffect(() => {
        if (isAuthenticated && user) {
            fetchUserGames();
        } else {
            navigate('/home');
        }
    }, [isAuthenticated, user]);

    if (isAuthenticated && user) {
        return (
            <div className='profile-main'>
                <div className='profile-info'>
                    <Container maxWidth="sm"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '50vh',
                            width: '90%',
                            mt: 7
                        }}
                    >
                        <Paper elevation={3} sx={{ mt: 5, p: 3 }}>
                            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                                <Avatar
                                    sx={{ width: 300, height: 300, mb: 2 }}
                                    src={user.avatar || "https://i.imgflip.com/9cgjzo.jpg"}
                                    alt={user.fname}
                                />
                                <Typography variant="h4">{user.fname + " " + user.lname || "User Name"}</Typography>
                            </Box>
                            <Divider />
                            <List>
                                <ListItem>
                                    <ListItemText primary="Username" secondary={user.username || "N/A"} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Email" secondary={user.email || "N/A"} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Account type" secondary={user.role || "N/A"} />
                                </ListItem>
                            </List>
                        </Paper>
                    </Container>
                </div>
                <div className='games-info'>
                    {user.role == 1 && (
                            <>
                            <Typography variant="h5">{user.username} DM Games:</Typography>
                            {userGames.map((userGame) => (
                                <Paper>
                                    <div key={userGame.id}>
                                        {games.map((game) => (
                                            game.id === userGame.game_id && (
                                                <div key={game.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '16px',
                                                    padding: '10px'
                                                 }}>
                                                    <div>
                                                        <Typography variant="h6" style={{ marginRight: '16px' }}>Name: {game.name}</Typography>
                                                        <Typography variant="h6" style={{ marginRight: '16px' }}>environment: {game.environment_id}</Typography>
                                                        <Typography variant="h6" style={{ marginRight: '16px' }}>start date: {game.start_date}</Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="body2">Users Id&apos;s:</Typography>
                                                        {gameUsers[game.id]?.map(user => (
                                                            <Typography key={user.user_id} variant="body2">
                                                                {user.user_id}
                                                            </Typography>
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => editGame(game)}>
                                                            Edit Game
                                                        </Button>
                                                        <Button variant="outlined" color="error" sx={{ mr: 1 }} onClick={() => deleteGame(game.id)}>
                                                            Delete Game
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </Paper>
                            ))}
                            </>
                    )}
                    {user.role == 0 && (
                        //pc view
                        <Paper>
                            <Typography variant="h5">Your Games:</Typography>
                            {userGames.map((userGame) => (
                                <div key={userGame.id}>
                                    <Typography variant="body1">Game ID: {userGame.game_id}</Typography>
                                    {games.map((game) => (
                                        game.id === userGame.game_id && (
                                            <div key={game.id}>
                                                <Typography variant="h6">{game.name}</Typography>
                                            </div>
                                        )
                                    ))}
                                </div>
                            ))}
                        </Paper>
                    )}
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Edit Game</DialogTitle>
                        <DialogContent>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Game Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={editingGame?.name || ''}
                            onChange={(e) => setEditingGame({...editingGame, name: e.target.value})}
                            />
                            <TextField
                            margin="dense"
                            id="environment_id"
                            name="environment_id"
                            label="Environment ID"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={editingGame?.environment_id || ''}
                            onChange={(e) => setEditingGame({...editingGame, environment_id: e.target.value})}
                            />
                            <TextField
                            margin="dense"
                            id="start_date"
                            name="start_date"
                            label="Start Date"
                            type="date"
                            fullWidth
                            variant="standard"
                            value={editingGame?.start_date || ''}
                            onChange={(e) => setEditingGame({...editingGame, start_date: e.target.value})}
                            defaultValue={editingGame?.start_date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmitEdit}>Save Changes</Button>
                        </DialogActions>
                        </Dialog>
                </div>
            </div>
        );
    } else {
        //hacky
        {navigate('/home')}
    }
}

export default ProfilePage