import React from 'react';
import './Contact.css';
import OpenPage from '../OpenPage/OpenPage';
import contactImg from '../../images/contactImg.jpg';
import contactMeat1 from '../../images/contactMeat1.jpg';
import contactIcon from '../../images/Icons/contact-us.png';
// import contactImg from '../../images/contactImg.jpg';

function Contact() {
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
                </div>
                <div className="contact_content">
                    <div className="contact_one">
                        <img src={contactIcon} alt="icon" />
                        <div>
                            <p>3/1585.3, kamarajar nagar,</p>
                            <p>Pamban - 623521</p>
                            <p>Rameshwaram</p>
                            <p>Phone : +91 77080 90287</p>
                            <p>Email : vijiliuse@gmail.com </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contact
