/**
 * See MUI docs for awesome MUI grid:
 * https://mui.com/material-ui/react-table/
 * In the future the datagrid displays could be consolidated into the context because
 * between games, characters, and environments the base display is almost exactly the same.
 */

import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

import './GamePage.css'


export default function GamePage() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, user, login, logout} = useAuth();
    let navigate = useNavigate();

    const fetchGames = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_SERVER_BASE}/games`);
            if (!response.ok) {
                throw new Error("Network error!");
            }
            const data = await response.json();

            if (data.length > 0) {
                setGames(data);
            }
        } catch (error) {
            console.error("Error fetching games:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGames();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Game Name', width: 90 },
        { field: 'dm_id', headerName: 'DM ID', width: 90 },
        { field: 'environment_id', headerName: 'Environment ID', width: 90 },
        { field: 'start_date', headerName: 'Game start date', width: 90 },
    ];

    return (
        <div className="game-main" style={{marginTop: 95}}>
            {loading && <Typography variant="h6">Loading...</Typography>}
            <div className="game-container" style={{ height: '100%', width: '100%' }}>
                <Paper style={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        rows={games}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        loading={loading}
                        getRowId={(row) => row.id}
                        onRowDoubleClick={(params, event) => {
                            console.log('Double clicked row:', params.row);
                            
                        }}
                        sx={{
                            '& .MuiDataGrid-columnHeader': {
                                backgroundColor: '#1976d2',
                                color: '#ffffff',
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                color: '#ffffff',
                            },
                        }}
                    />
                </Paper>
            </div>
            {isAuthenticated == true && user.role == 1 && (
                <>
                    <div className="env-options">
                        <button type="button" onClick={() => navigate('/game_create')}>
                            Create Game
                        </button>
                    </div>
                </>
            )}
            {isAuthenticated == true && user.role == 0 && (
                <>
                    <div className="env-options">
                        Register with a DM account to create games!
                    </div>
                </>
            )}
            {isAuthenticated == false && (
                <>
                    <div className="env-options">
                        Login or Register with a DM account to create and export games!
                    </div>
                </>
            )}
        </div>
    );
}