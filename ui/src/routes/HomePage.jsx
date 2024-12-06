import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";
import { Container, Typography, Grid2, Paper, Button } from '@mui/material';

import './HomePage.css'

function HomePage() {
    const { isAuthenticated, user } = useAuth();
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {

        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="home-page">
                <div className="container">
                    <Grid2 container spacing={3} justifyContent="center">
                        <Grid2 item xs={12} md={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" gutterBottom>Quick Links</Typography>
                                <Button component={Link} to="/characters" variant="contained" sx={{ mb: 1 }}>Characters</Button>
                                <Button component={Link} to="/environments" variant="contained" sx={{ mb: 1 }}>Environments</Button>
                                <Button component={Link} to="/games" variant="contained">Games</Button>
                            </Paper>
                        </Grid2>
                    </Grid2>
                    <Container maxWidth="lg" sx={{ mt: 14, mb: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            Welcome to Pathfinder 1E setup tools!
                        </Typography>
                        <Typography variant="body1">
                            Please log in to access all the features, but feel free to browse games, chracter sheets, and environments!
                        </Typography>
                        <Button component={Link} to="/login" variant="contained" sx={{ mt: 2 }}>
                            Log In or Register
                        </Button>
                    </Container>
                </div>
            </div>
        );
    }

    return (
        <div className="home-page">
            <div className="container">
                <Container maxWidth="lg" sx={{ mt: 14, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome, {user.username}!
                    </Typography>

                    <Grid2 container spacing={3}>
                        <Grid2 item xs={12} md={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" gutterBottom>Quick Links</Typography>
                                <Button component={Link} to="/characters" variant="contained" sx={{ mb: 1 }}>Characters</Button>
                                <Button component={Link} to="/environments" variant="contained" sx={{ mb: 1 }}>Environments</Button>
                                <Button component={Link} to="/games" variant="contained">Games</Button>
                            </Paper>
                        </Grid2>

                        <Grid2 item xs={12} md={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                                {recentActivity.map((activity, index) => (
                                    <Typography key={index} variant="body2">{activity}</Typography>
                                ))}
                            </Paper>
                        </Grid2>

                        <Grid2 item xs={12} md={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" gutterBottom>Your Stats</Typography>
                                <Typography variant="body2">Games: {user.gamesCount}</Typography>
                                <Typography variant="body2">Characters: {user.charactersCount}</Typography>
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Container>
            </div>
        </div>
    );
}

export default HomePage