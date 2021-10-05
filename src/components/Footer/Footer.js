import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import facebookIcon from '../../images/Icons/facebooklogo.png';
import instaIcon from '../../images/Icons/instalogo.png';
import twitterIcon from '../../images/Icons/twitterlogo.png';

function Footer() {
    return (
        <div className="footer_page">
            <div className="footer_container">
                <div className="vg_foot">
                    <p className="foot_title">VG Sea Foods</p>
                    <p className="greet">At VG sea foods, we're big meat-lovers. And by big, we mean huge. So when it comes to the meat we put on your plate, we're extreamly picky. Every single product is handpicked by team with eaperience. Our seafood is delivered straight from source Every. Single. Day.</p>
                </div>
                <div className="quick_links">
                    <p className="foot_title link_head">Quick Links</p>
                    <ul>
                        <li><Link to="/home" className="links">Home</Link></li>
                        <li><Link to="/about" className="links">About</Link></li>
                        <li><Link to="/contact" className="links">Contact</Link></li>
                        <li><Link to="/cart" className="links">Cart</Link></li>
                        <li><Link to="/" className="links">Logout</Link></li>
                    </ul>
                </div>
                <div className="foot_address">
                    <p className="foot_title">Address</p>
                    <p>Address : 3/1585.3, kamarajar nagar,</p>
                    <p>Pamban - 623521,</p>
                    <p>Rameshwaram.</p>
                    <p>Phone : +91 77080 90287</p>
                    <p>Email : vijiliuse@gmail.com </p>
                </div>
            </div>
            <div className="copyright">
                <div className="foot_social_links">
                    <a href="https://www.facebook.com/viji.mansi"><i className="fa fa-facebook"></i></a>
                    <a href="https://twitter.com/Vijiliuse1?s=08"><i className="fa fa-twitter"></i></a>
                    <a href="https://www.instagram.com/vijiliuse/" ><i className="fa fa-instagram"></i></a>
                </div>
                <p>Webshine2020@ Read All Terms & conditions .</p>
                <p>© All rights Reserved.</p>

            </div>
            {/* <p>Made with ❤️ by Prabu...</p> */}
        </div>
    )
}

export default Footer
