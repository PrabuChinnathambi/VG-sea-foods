import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenPage from '../OpenPage/OpenPage';
import './About.css';
import aboutImg from '../../images/aboutImg.jpg';
import aboutMeat1 from '../../images/aboutMeat1.jpg';
import aboutMeat2 from '../../images/aboutMeat2.jpg';
import aboutMeat3 from '../../images/aboutMeat3.jpg';
import Footer from '../Footer/Footer';
import arrow from '../../images/Icons/double-down.png';



function About() {

    const state = useSelector(state => state.getproducts)
    console.log(state);
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="about_page">
            <div className="about_nav">
                <OpenPage />
            </div>
            <div className="about_container">
                <div className="aboutImg">
                    <link className="image" rel="preload" as="image" href={aboutImg}></link>
                    <img src={aboutImg} alt="img" />
                </div>
                <div className="about_greeting">
                    <h1>About</h1>
                    <p>Most companies have fancy mission statements. Ours is simple. We want to help you eat the best meat possible. That's it. To do that, we're changing the entire category by focussing on few key things</p>
                    <div className="scroll">
                        <p>scroll down</p>
                        <img src={arrow} alt="scroll" />
                    </div>

                </div>
                <div className="about_content">
                    <div className="content_one">
                        <img src={aboutMeat1} alt="meat1" />
                        <div className="detail">
                            <h2>We will sell only the meat that we would eat ourselves</h2>
                            <p>At VG sea foods, we're big meat-lovers. And by big, we mean huge. So when it comes to the meat we put on your plate, we're extreamly picky. Every single product is handpicked by team with eaperience. Our seafood is delivered straight from source Every. Single. Day.</p>
                        </div>
                    </div>
                    <div className="content_one">
                        <div className="detail">
                            <h2>If it's not fresh, we won't sell it.</h2>
                            <p>For meat to stay fresh and retain its natural juices, it needs to be stored at a temperature between 0° and 5°. We maintain this temperature from the time we procure the product to cleaning and strong it, until it leaves fro delivery. And even when it's out for delivery, we keep ot chilled right up to your doorstep.</p>
                        </div>
                        <img src={aboutMeat2} alt="meat1" />
                    </div>
                    <div className="content_one">
                        <img src={aboutMeat3} alt="meat1" />
                        <div className="detail">
                            <h2>We will charge only for what you buy.</h2>
                            <p>Doesn't everyone do this? Not really. Most other places weight the meat, then cut up the pieces, and throw out the parts which aren't fit to eat. But you still pay based on the orginal weight even though what you finally get 10% to 30% less. At VG sea foods, we first clean the meat, then cut , then weigh. And that meat will be only the best bits - more meat and less bones. Thanks for reading. Now you know what we'ev set out to do and how we're doing it.</p>
                        </div>
                    </div>
                </div>

                {/* <Link to="/admin">Admin</Link> */}
            </div>
            <div>
                <Footer />
            </div>

        </div>
    )
}

export default About
