import React from 'react';
import Logo from '../../../images/newlogo2.png';
import { Link } from 'react-router-dom';
import './NavPage.css';

function NavPage() {
    return (
        <div className="admin_navpage">
            <div className="navclr">
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
                                <ul className="navbar-nav">
                                    <ul>
                                        <li><Link to="/adminDashboard" className="links">Dashboard</Link></li>
                                        <li><Link to="/orderdetails" className="links">OrderDetails</Link></li>
                                        <li><Link to="" className="links">Deliverd</Link></li>
                                        <li><Link to="" className="links">Logout</Link></li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                    </nav>

                </div>
            </div>
        </div>
    )
}

export default NavPage
