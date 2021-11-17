import React, { useEffect } from 'react';
import './Contact.css';
import OpenPage from '../OpenPage/OpenPage';
import contactImg from '../../images/contactImg.jpg';
import contactMeat1 from '../../images/contactMeat1.jpg';
import contactIcon from '../../images/Icons/contact-us.png';
import facebookIcon from '../../images/Icons/facebooklogo.png';
import instaIcon from '../../images/Icons/instalogo.png';
import twitterIcon from '../../images/Icons/twitterlogo.png';
import arrow from '../../images/Icons/double-down.png';

import Feedback from '../Feedback/Feedback';
import Footer from '../Footer/Footer';
// import contactImg from '../../images/contactImg.jpg';

function Contact() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="contact_page">
            <div className="contact_nav">
                <OpenPage />
            </div>

            <div className="contact_container">
                <div className="contactImg">
                    <img src={contactImg} alt="img" />
                </div>
                <div className="contact_greeting">
                    <h1>Contact Us</h1>
                    <p>We look forward to hearing from you, feel free to contact us at any time. If you have any questions about our services you may contact us by fill in this form.</p>
                    <div className="scroll">
                        <p>scroll down</p>
                        <img src={arrow} alt="scroll" />
                        
                    </div>

                </div>
                <div className="contact_content">
                    <div className="contact_one">
                        <img className="contact" src={contactIcon} alt="icon" />
                        <div className="address_details">
                            <p>Address : 3/1585.3, kamarajar nagar,</p>
                            <p>Pamban - 623521,</p>
                            <p>Rameshwaram.</p>
                            <p>Phone : +91 77080 90287</p>
                            <p>Email : vijiliuse@gmail.com </p>
                            <div className="social_links">
                                <div className="twitter">
                                    <a href="https://twitter.com/Vijiliuse1?s=08"><img src={twitterIcon} alt="twitter" /></a>
                                </div>
                                <div className="facebook" >
                                    <a href="https://www.facebook.com/viji.mansi"><img src={facebookIcon} alt="facebook" /></a>
                                </div>
                                <div className="insta">
                                    <a href="https://www.instagram.com/vijiliuse/"><img src={instaIcon} alt="insta" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="feedback_map">
                    <div>
                        <Feedback />
                    </div>
                    <div className="map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.5261110256747!2d79.21872141478856!3d9.286563793342422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMTcnMTEuNiJOIDc5wrAxMycxNS4zIkU!5e0!3m2!1sen!2sin!4v1632199181610!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy"></iframe>
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100593.00418620555!2d77.13331640573878!3d11.340862562411319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8e195ebbd3831%3A0xa9e5914802227dfa!2sPuliampatti%2C%20Tamil%20Nadu%20638459!5e0!3m2!1sen!2sin!4v1631898255787!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy"></iframe> */}
                    </div>


                </div>

            </div>
            <div>
                <Footer />
            </div>
        </div >


    )
}

export default Contact
