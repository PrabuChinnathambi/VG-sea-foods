import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import slide1 from '../../images/sliderImg/slider1.jpg';
import slide2 from '../../images/sliderImg/slider2.jpg';
import slide3 from '../../images/sliderImg/slider3.jpg';
import './Slider.css';

function Slider() {
    return (
        <div className="slider_page">
            <div className="slider_container">
                <Carousel className="carousel" autoPlay={true} showThumbs={false} interval={5000} autoPlay={true} infiniteLoop={true}>
                    <div className="slides">
                        <img src={slide1} />
                        
                        {/* <div className="slide1_detail">
                            <h1>VG</h1>
                            <p>Sea Foods Festival</p>
                            <p>We are in online Now 😃. We provides fresh seafood delivery right to your front door</p>
                        </div> */}
                    </div>
                    <div className="slides">
                        <img src={slide2} />
                        
                        {/* <div className="slide2_detail">
                            <h1>Book Your Order</h1>
                            <p>We are Happily to deliver your Products.</p>
                            <p>Time is going Quickly order now</p>
                        </div> */}
                    </div>
                    <div className="slides">
                        <img src={slide3} />
                        
                        {/* <div className="slide2_detail">
                            <h1>Fast Delivery</h1>
                            <p>Our products will be reach in your door steps</p>
                            <p>With Fresh & Fast delivery</p>
                        </div> */}
                    </div>
                </Carousel>

            </div>
        </div>
    )
}

export default Slider
