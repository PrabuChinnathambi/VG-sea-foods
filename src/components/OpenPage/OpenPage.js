import React, { useState } from 'react';
import './OpenPage.css';
import Logo from '../../images/newlogo2.png';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



function OpenPage() {
    const [navcolor, setNavcolor] = useState(false);

    

    window.onscroll = () => {
        if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
            // console.log("scrolled")
            setNavcolor(true);
        } else {
            setNavcolor(false)
        }
    }

    return (
        <div className={navcolor ? "navColored" : "navNonClored"}>
            <div className="nav_page">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <img src={Logo} alt="" />
                        <p className="name">Sea Foods</p>
                        <div className="toggler_button">
                            <button className="navbar-toggler bg-dark" type="button" data-toggle="collapse" data-target="#navbarNav">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <ul>
                                    <li><Link to="/home" className="links">Home</Link></li>
                                    <li><Link to="/about" className="links">About</Link></li>
                                    <li><Link to="/contact" className="links">Contact</Link></li>
                                    <li><Link to="/cart" className="links">Cart</Link></li>
                                    {/* <li><Link to="/" className="links">Logout</Link></li> */}

                                    <div>
                                        <Button
                                            id="basic-button"
                                            aria-controls="basic-menu"
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            Dashboard
                                        </Button>

                                    </div>
                                </ul>
                            </ul>

                        </div>
                    </div>
                </nav>

            </div>
            <div className="drop_menu">
 <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}

                

            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            </div>
           
        </div>
    )
}

export default OpenPage
