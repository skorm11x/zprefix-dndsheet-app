import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Person3Icon from '@mui/icons-material/Person3';
import HomeIcon from '@mui/icons-material/Home';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";

import './AppBar.css';

import useSearch from '../hooks/useSearch';
import { useAuth } from '../context/AuthContext';

function BaseAppBar() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const {setSearch} = useSearch();
    const [searchInput, setSearchInput] = useState('');
    const { isAuthenticated, user, login, logout } = useAuth();
    let navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleSearchInputChange = (e) => {
      setSearchInput(e.target.value);
    };

    useEffect(() => {
  }, [isAuthenticated]);

    return (
        <AppBar className="app-bar">
          <center><b>Pathfinder 1E Game Setup Tool</b></center>
          <div className="header-container">
          <Link to="/home" className="link"><HomeIcon /></Link>
            <div className="search-container">
              <InputBase
                className="search-input"
                placeholder="Search for game name…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchInput}
                onChange={handleSearchInputChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setSearch(searchInput);
                    setSearchInput('');
                  }}}
              />
              <div className="search-icon-wrapper">
                <Button
                onClick={() => {
                  setSearch(searchInput);
                  setSearchInput('');
                }}
                >
                  <SearchIcon />
                </Button>
              </div>
            </div>
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