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
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

import './CharacterPage.css'


export default function CharacterPage() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, user, login, logout} = useAuth();
    let navigate = useNavigate();

    const fetchCharacters = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_SERVER_BASE}/characters`);
            if (!response.ok) {
                throw new Error("Network error!");
            }
            const data = await response.json();

            if (data.length > 0) {
                setCharacters(data);
            }
        } catch (error) {
            console.error("Error fetching characters:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCharacters();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'fname', headerName: 'First Name', width: 90 },
        { field: 'lname', headerName: 'Last Name', width: 90 },
        { field: 'race', headerName: 'Race', width: 90 },
        { field: 'class', headerName: 'Class', width: 90 },
        { field: 'alignment', headerName: 'Alignment', width: 90 },
        { field: 'deity', headerName: 'Deity', width: 90 },
        { field: 'str', headerName: 'Strength', width: 90 },
        { field: 'dex', headerName: 'Dexterity', width: 90 },
        { field: 'con', headerName: 'Constitution', width: 90 },
        { field: 'int', headerName: 'Intelligence', width: 90 },
        { field: 'wis', headerName: 'Wisdom', width: 90 },
        { field: 'cha', headerName: 'Charisma', width: 90 },
        { field: 'background', headerName: 'Background', width: 90 },
    ];

    return (
        <div className="character-page" style={{marginTop: 95}}>
            {loading && <Typography variant="h6">Loading...</Typography>}
            <div className="character-container" style={{ height: '100%', width: '100%' }}>
                <Paper style={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        rows={characters}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        loading={loading}
                        getRowId={(row) => row.id}
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
            {isAuthenticated == true && user != null && (
                <>
                    <div className="character-options">
                        <button type="button" onClick={() => navigate('/character_create')}>
                            Create Character
                        </button>
                    </div>
                </>
            )}
            {isAuthenticated == false && (
                <>
                    <div className="character-options">
                        Login or Register to create and export characters!
                    </div>
                </>
            )}
        </div>
    );
}