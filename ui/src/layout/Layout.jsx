import { Outlet } from 'react-router-dom';
import BaseAppBar from '../components/AppBar.jsx';
import SearchProvider from '../context/SearchProvider';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from '../theme/MainTheme.js';


const Layout = () => {
  return (
      <ThemeProvider theme={theme}>
        <SearchProvider>
          <AuthProvider>
            <div className="layout">
              <div className="header">
                <BaseAppBar />
              </div>
              <div className='content'>
                <Outlet />
              </div>
            </div>
          </AuthProvider>
        </SearchProvider>
      </ThemeProvider>
  );
};

export default Layout;