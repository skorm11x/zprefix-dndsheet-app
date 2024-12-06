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


export default function EnvironmentPage() {
    const [environments, setEnvironments] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, user, login, logout} = useAuth();
    let navigate = useNavigate();

    const fetchEnvironments = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_SERVER_BASE}/environments`);
            if (!response.ok) {
                throw new Error("Network error!");
            }
            const data = await response.json();

            if (data.length > 0) {
                setEnvironments(data);
            }
        } catch (error) {
            console.error("Error fetching environments:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEnvironments();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Environment Name', width: 90 }
    ];

    return (
        <div className="env-main" style={{marginTop: 95}}>
            {loading && <Typography variant="h6">Loading...</Typography>}
            <div className="env-container" style={{ height: '100%', width: '100%' }}>
                <Paper style={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        rows={environments}
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
                    <div className="env-options">
                        <button type="button" onClick={() => navigate('/env_create')}>
                            Create Environment
                        </button>
                    </div>
                </>
            )}
            {isAuthenticated == false && (
                <>
                    <div className="env-options">
                        Login or Register to create and export environments!
                    </div>
                </>
            )}
        </div>
    );
}