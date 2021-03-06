import React, { useState } from 'react';
import './OpenPage.css';
import Logo from '../../images/newlogo2.png';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'




// const cookies = new Cookies();


function OpenPage() {

    const history = new useHistory();
    
    const [navcolor, setNavcolor] = useState(false);

    

    window.onscroll = () => {
        if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
            // console.log("scrolled")
            setNavcolor(true);
        } else {
            setNavcolor(false)
        }
    }

    const hanldeLogout = () => {
        localStorage.clear();
        history.push('/');
        window.location.reload();
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
                                    <li><Link to="/" onClick={hanldeLogout} className="links">Logout</Link></li> 
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
