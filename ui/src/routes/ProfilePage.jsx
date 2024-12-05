import { useAuth } from '../context/AuthContext';
import {
    Container,
    Paper,
    Typography,
    Avatar,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

function ProfilePage() {
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated && user) {
        return (
            <Container maxWidth="sm"
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh',
                width: '90%',
                mt: 1 
            }}
            >
                <Paper elevation={3} sx={{ mt: 5, p: 3 }}>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                        <Avatar
                            sx={{ width: 300, height: 300, mb: 2 }}
                            src={user.avatar || "https://i.imgflip.com/9cgjzo.jpg"}
                            alt={user.fname}
                        />
                        <Typography variant="h4">{user.fname +" "+ user.lname || "User Name"}</Typography>
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
        );
    } else {
        return (
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ mt: 5, p: 3, textAlign: 'center' }}>
                    <LockIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
                    <Typography variant="h4" color="error">
                        Access Denied
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        You must be logged in to view this page.
                    </Typography>
                </Paper>
            </Container>
        );
    }
}

export default ProfilePage