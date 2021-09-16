import React, { useState } from 'react';
import './OpenPage.css';
import Logo from '../../images/vg.png';
import { Link } from 'react-router-dom';

function OpenPage() {
    const [navcolor, setNavcolor] = useState(false);

    window.onscroll = () => {
        if (document.body.scrollTop >= 350 || document.documentElement.scrollTop >= 350) {
            console.log("scrolled")
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
                        <button className="navbar-toggler bg-dark " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <ul>
                                    <li><Link to="/home" className="links">Home</Link></li>
                                    <li><Link to="/about" className="links">About</Link></li>
                                    <li><Link to="/contact" className="links">Contact</Link></li>
                                    <li><Link to="/cart" className="links">Cart</Link></li>
                                    <li><Link to="/logout" className="links">Logout</Link></li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        </div>
    )
}

export default OpenPage
