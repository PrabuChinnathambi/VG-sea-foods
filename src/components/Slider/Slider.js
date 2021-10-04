import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import slide1 from '../../images/sliderImg/slider1.jpg';
import slide2 from '../../images/sliderImg/slider2.jpg';
import slide3 from '../../images/sliderImg/slider3.jpg';
import { Typewriter } from 'react-simple-typewriter';
import './Slider.css';

function Slider() {


    const handleType = (count) => {
        // access word count number
        // console.log(count)
    }

    const handleDone = () => {
        // console.log(`Done after 5 loops!`)
    }


    return (
        <div className="slider_page">
            <div className="slider_container">
                <Carousel className="carousel" autoPlay={true} showThumbs={false} interval={5000} infiniteLoop={true}>
                    <div className="slides">
                        <img src={slide1} alt="" />
                       
                    </div>
                    <div className="slides">
                        <img src={slide2} alt="" />

                        {/* <div className="slide2_detail">
                            <h1>Book Your Order</h1>
                            <p>We are Happily to deliver your Products.</p>
                            <p>Time is going Quickly order now</p>
                        </div> */}
                    </div>
                    <div className="slides">
                        <img src={slide3} alt="" />

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
