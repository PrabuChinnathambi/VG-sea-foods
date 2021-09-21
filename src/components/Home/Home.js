import React, { useState, useEffect } from 'react'
import './Home.css';
// import './star.scss';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";
import PulseLoader from "react-spinners/PulseLoader";
import { useSelector } from 'react-redux'
import OpenPage from '../OpenPage/OpenPage';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ButtonBase, Button, Slider } from '@material-ui/core';
import SliderVal from '../Slider/Slider';
import { ToastContainer, toast } from 'react-toastify';


import fastDelivery from '../../images/Icons/fast-delivery.png';
import saveDelivery from '../../images/Icons/delivery-box.png';
import deliciousDelivery from '../../images/Icons/delicious.png';
import cart from '../../images/Icons/shopping-cart.png';
import Footer from '../Footer/Footer';

import Flip from 'react-reveal/Flip';


function Home() {

    const [productsData, setProductsData] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartDatacheck, setcartDatacheck] = useState([])
    const [loader, setLoader] = useState([]);

    const userVal = useSelector((state) => state.user);
    // console.log(userVal);

    let userCart = JSON.parse(localStorage.getItem("userData"));
    console.log(userCart.cart);




    let store = localStorage.getItem("token");

    Axios.interceptors.request.use(
        config => {
            config.headers.Authorization = store;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    //TimeOutcode
    // setTimeout(() => {
    //     this.setState({ loading: false });
    //   }, 2000);


    useEffect(() => {

        getProducts();
        getUserCart();

    }, [])

    const getProducts = async () => {

        const response = await Axios.get("https://vgseafoods.herokuapp.com/getItemData")
            .then(res => {
                console.log(res);
                setProductsData(res.data);
                setLoading(false);
            }).catch(err => {
                console.log(err.response.data)
            })


    };


    const getUserCart = async () => {
        const payload = {
            userId: userCart._id
        }
        await Axios.post('https://vgseafoods.herokuapp.com/getUserCart', payload)
            .then((result) => {
                console.log(result.data);
                setcartDatacheck(result.data.cart);
                setCartCount(result.data.cart.length);
            }).catch((err) => {
                console.log(err);
            })
    }

    const handleAddtocart = (res) => {

        setLoader(res._id)
        // console.log(user._id);
        // console.log(res._id);


        const user = JSON.parse(localStorage.getItem("userData"));

        var productcheck = false;

        cartDatacheck.map(item => {
            if (item.product_id === res._id) {
                productcheck = true
            }
        })

        const cartItem = {
            product_id: res._id,
            productName: res.productName,
            image: res.image,
            cost: res.cost,
            quantity: "1",

        };

        if (productcheck) {
            toast.error('Product already added')
            setLoader([])
        } else {
            cartDatacheck.push(cartItem)
            const userId = user._id;
            const payload = {
                userId: userId,
                cartItem: cartItem
            }

            console.log(payload);

            Axios.post("https://vgseafoods.herokuapp.com/addCart", payload)
                .then(data => {
                    console.log(data);
                    setLoader([])
                    toast.success("Successfully added into the cart", {
                        position: toast.POSITION.TOP_CENTER
                    })
                    getUserCart();
                })

        }

    }


    console.log(loader);


    return (
        <div className="home_page">
            {
                loading ? (
                    <div className="loader">
                        <FadeLoader color="#0074D9" loading="true" />
                    </div>
                ) : (
                    <div>
                        <ToastContainer autoClose={2000} />
                        <div className="home_navbar">
                            <OpenPage />
                        </div>
                        <div className="home_container">
                            <Link to={{
                                pathname: "/cart",
                            }} >
                                <div className="icon_float">
                                    <div className="add_cart">
                                        <img src={cart} alt="" />
                                        <div className="count"><p>{cartCount}</p></div>
                                    </div>
                                </div>
                            </Link>
                            <div className="home_products">
                                <div className="slider">
                                    <SliderVal />
                                </div>
                                <div>
                                    <Flip bottom delay={2000}>
                                        <div className="deliver_card">
                                            <div>
                                                <i><img src={fastDelivery} alt="icon" /></i>
                                                <h2>Fast Delivery</h2>
                                                <p>We are providing door step devlivery within a less time for main resion of customer satisfaction</p>
                                            </div>
                                            <div className="saveDelivery">

                                                <i><img src={saveDelivery} alt="icon" /></i>
                                                <h2>Safe & Secure</h2>
                                                <p>Mainly focusing for safe and secure to this process.We will provide our meat to your hand with safely and securely</p>

                                            </div>
                                            <div>
                                                <i><img src={deliciousDelivery} alt="icon" /></i>
                                                <h2>Fresh Meat</h2>
                                                <p>We are Assured to Fresh Meat.Every day you will get new and fresh meat only</p>
                                            </div>
                                        </div>
                                    </Flip>
                                </div>
                                <Flip bottom>
                                    <div className="prod_details">
                                        <h1>Product Details</h1>
                                    </div>
                                </Flip>
                                <div className="products">
                                    {
                                        productsData.map((res) => {
                                            return (
                                                <div className="home_productCard" key={res._id}>
                                                    <div className="product_img">
                                                        <img src={res.image} alt="" />
                                                    </div>
                                                    <div className="card_details">
                                                        <p className="product_name">{res.productName}</p>
                                                        <p className="product_cost">Cost : ₹ {res.cost}/kg</p>
                                                        <div className="star">
                                                            <span className="fa fa-star checked"></span>
                                                            <span className="fa fa-star checked"></span>
                                                            <span className="fa fa-star checked"></span>
                                                            <span className="fa fa-star"></span>
                                                            <span className="fa fa-star"></span>
                                                        </div>
                                                        <Button className="button" onClick={() => { handleAddtocart(res) }} variant="contained" color="primary">
                                                            {
                                                                loader === res._id ? <span><PulseLoader color="white" size={10} ></PulseLoader></span> : <span>Add To Cart</span>
                                                            }
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <div>
            </div>

        </div >
    )
}

export default Home
