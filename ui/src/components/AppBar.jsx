import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import Person3Icon from '@mui/icons-material/Person3';
import HomeIcon from '@mui/icons-material/Home';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import {ListItemText, MenuItem} from '@mui/material';
import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";

import './AppBar.css';

import useSearch from '../hooks/useSearch';
import { useAuth } from '../context/AuthContext';

function BaseAppBar() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [categoryEl, setCategoryEl] = React.useState(null);
    const {setSearch} = useSearch();
    const [searchInput, setSearchInput] = useState('');
    const { isAuthenticated, user, login, logout } = useAuth();
    let navigate = useNavigate();

    const open = Boolean(anchorEl);
    const openCategory = Boolean(categoryEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleSearchInputChange = (e) => {
      setSearchInput(e.target.value);
    };

    const handleCatClick = (event) => {
      setCategoryEl(event.currentTarget);
    };
    const handleCatClose = () => {
      setCategoryEl(null);
    };

    useEffect(() => {
  }, [isAuthenticated]);

    return (
        <AppBar className="app-bar">
          <center><b>Pathfinder 1E Game Setup Tool</b></center>
          <div className="header-container">
              <Link to="/home" className="link"><HomeIcon /></Link>
          <Button
            id="category-button"
            aria-controls={openCategory ? 'category-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openCategory ? 'true' : undefined}
            onClick={handleCatClick}
          >
            <CategoryIcon />
          </Button>
          <Menu
            id="category-menu"
            anchorEl={categoryEl}
            open={openCategory}
            onClose={handleCatClose}
            MenuListProps={{
              'aria-labelledby': 'category-button',
            }}
          >
            <div>
              <MenuItem onClick={() => navigate('/games')}>
                <ListItemText primary="Games" />
              </MenuItem>
              <MenuItem onClick={() => navigate('/characters')}>
                <ListItemText primary="Characters" />
              </MenuItem>
              <MenuItem onClick={() => navigate('/environments')}>
                <ListItemText primary="Environments" />
              </MenuItem>
            </div>
          </Menu>
              <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onMouseEnter={handleClick}
            >
              <Person3Icon />
              </Button>
              <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {isAuthenticated ? (
                <div>
                  <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={() => { logout(); handleClose(); navigate('/home') }}>Logout</MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem component={Link} to="/login" onClick={handleClose}>Login or Register</MenuItem>
                </div>
              )}
              </Menu>
          </div>
        </AppBar>
      )

};

export default BaseAppBar;