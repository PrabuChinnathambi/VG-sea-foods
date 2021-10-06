import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import './Cart.css';
import FadeLoader from "react-spinners/FadeLoader";
import PulseLoader from "react-spinners/PulseLoader";
import { IconButton } from '@material-ui/core';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import OpenPage from '../OpenPage/OpenPage';
import cartImg from '../../images/cartImg.jpg';
import Footer from '../Footer/Footer';

import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';
import emailjs from 'emailjs-com';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};




function Cart() {

    const history = useHistory();
    const [usertDatas, setUsertDatas] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [cartSumToggle, setCartSumToggle] = useState(true);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [addresDetails, setAddresDetails] = useState({
        name: "",
        phonenumber: "",
        address: ""
    });

    const [deleteLoader, setDeleteLoader] = useState([]);

    const [opensuccess, setOpensuccess] = React.useState(false);
    const handleOpenSuccess = () => setOpensuccess(true);
    const handleCloseSuccess = () => {

        setOpensuccess(false);
    }


    const userNew = JSON.parse(localStorage.getItem("userData"));
    // console.log(userNew);
    let userId = userNew._id;

    useEffect(() => {
        getCartData();

    }, [])

    const handleClickOpen = () => {

        if (cartData.length !== 0) {
            setOpen(true);
        } else {
            toast("No Items in a Cart")
        }

    };

    const handleClose = () => {
        setOpen(false);
    };

    const getCartData = async () => {
        const payload = {
            userId: userId
        }

        await Axios.post('https://vgseafoods.herokuapp.com/getUserCart', payload)
            .then((res) => {
                // console.log(res.data.cart);
                setUsertDatas(res.data);
                setCartData(res.data.cart);
                setLoading(false)
                calculate(res.data.cart);
            }).catch(err => {
                console.log(err);
            })
    }


    const handleQuantity = (e) => {

        const productId = e.target.id;

        cartData.map(item => {
            if (item.product_id === productId) {
                item.quantity = e.target.value;
            }
        })

        calculate(cartData);
    }


    const calculate = (cart) => {

        console.log(cart);
        var sum = 0;
        cart.map(item => {
            sum += item.cost * item.quantity
        })
        setTotal(sum);

    }

    const deleteCartProduct = (item) => {

        setDeleteLoader(item.product_id);
        console.log(item)
        const payload = {
            userId: userId,
            product_id: item.product_id
        }
        console.log(payload)
        Axios.post("https://vgseafoods.herokuapp.com/deleteCartProduct", payload)
            .then((result) => {
                console.log(result);
                toast("Product removed from cart")
                setDeleteLoader([]);
                getCartData();
            }).catch(err => {
                console.log(err);
            })
    }

    const handleAddressDetails = (e) => {
        setAddresDetails({ ...addresDetails, [e.target.name]: e.target.value })

    }

    const handleDone = () => {
        history.push('/home');
        // window.location.reload();
    }

    const handlesuccess = () => {
        const timestamp = Date.now();

        const payload = {
            userInfo: userNew,
            addressDetails: addresDetails,
            orderDetails: cartData,
            totalAmount: total,
            time: timestamp
        }

        console.log(payload);

        const userpayload = {
            userId: userId
        }

        const userName = addresDetails.name;
        const userEmail = userNew.email;
        const userorderDT = `You have ordered ${cartData.length} products. Details : ${cartData.map(item => {
            return (
                ` ${item.productName} ${item.quantity}kg`)
        })} Total cost : Rs.${total}`


        Axios.post("https://vgseafoods.herokuapp.com/bookOrder", payload)
            .then(res => {
                console.log(res);
                Axios.post("https://vgseafoods.herokuapp.com/deleteAllCart", userpayload)
                    .then(res => {
                        console.log(res)
                    }).catch(err => {
                        console.log(err.message)
                    })
                emailjs.send("service_dr0tbcj", "template_3qfjypb", {
                    message: userorderDT,
                    user_email: userEmail,
                    user_name: userName,
                }, 'user_BYdBMHlMXkwBuEeeUawlc');
                handleOpenSuccess();


            }).catch(err => {
                console.log(err.message);
            })

        setAddresDetails({
            name: "",
            phonenumber: "",
            address: ""
        })
        handleClose();
        // console.log(addresDetails)
        // console.log(cartData);
        // console.log(total);
    }

    // console.log(total);
    // console.log(usertDatas);
    // console.log(cartData);
    console.log(addresDetails.name);
    console.log(addresDetails.phonenumber);
    console.log(addresDetails.address);


    return (
        <div className="cart_page">
            {
                loading ? (
                    <div className="loader">
                        <FadeLoader color="#0074D9" loading="true" />
                    </div>
                ) : (
                    <div>
                        <div className="cart_nav">
                            <OpenPage />
                        </div>
                        <ToastContainer />
                        <div className="cartImg">
                            <img src={cartImg} alt="" />
                        </div>
                        <div className="cart_greeting">
                            <h1>Cart Details</h1>
                            <p>What are the products did have added into the cart. It will shown below with cost details. If you want increase the quantity of any product you can do it easily.</p>
                            <div className="scroll">
                                <p>scroll down</p>
                                <img src="https://img.icons8.com/ios-glyphs/2x/4a90e2/double-down.png" alt="scroll" />
                            </div>

                        </div>
                        <div className="cart_container">

                            <div className="cart_details">
                                {
                                    cartData.length !== 0 ? (
                                        cartData.map(item => {
                                            return (
                                                <div key={item.product_id} className="cart_card">
                                                    <img src={item.image} alt="image" />
                                                    <div className="cost_details">
                                                        <h2>{item.productName}</h2>
                                                        <h3>Cost: {item.cost}/kg</h3>
                                                        <div className="drop_down" key={item._id}>
                                                            <select onChange={(val) => handleQuantity(val)} id={item.product_id} >
                                                                <option>Qty : {item.quantity}</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>
                                                        <div >
                                                            <Button onClick={() => deleteCartProduct(item)} variant="contained" color="secondary" className="delete_button">
                                                                {
                                                                    deleteLoader === item.product_id ? <span><PulseLoader color="white" size={8} ></PulseLoader></span> : <span>Remove</span>
                                                                }
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                        })

                                    ) : (
                                        <div className="empty">
                                            <h2><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/worried-face_1f61f.png" /> It's Empty .!!! </h2>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="cart_payment">
                                <div className="payment_container">
                                    <p className="heading">Payment Details :</p>
                                    <div>
                                        {
                                            cartData.map((item) => {
                                                return (
                                                    <div className="cart_main">
                                                        <div key={item._id} className="payment_card">
                                                            <p>{item.productName}</p>
                                                            <p>{item.quantity}</p>
                                                            <p>×</p>
                                                            <p>₹{item.cost}</p>
                                                            <p>=</p>
                                                            <p>₹{item.cost * item.quantity}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="total">
                                            <p>Total Amount</p>
                                            <p>=</p>
                                            <p>₹{total}</p>
                                        </div>
                                        <div className="order_button">
                                            <button className="button" onClick={handleClickOpen}>
                                                <span className="button__text">
                                                    <span>B</span><span>o</span>o</span><span>k</span><span> </span><span>O</span><span>r</span><span>d</span><span>e</span><span>r</span>

                                                <svg className="button__svg" role="presentational" viewBox="0 0 600 600">
                                                    <defs>
                                                        <clipPath id="myClip">
                                                            <rect x="0" y="0" width="100%" height="50%" />
                                                        </clipPath>
                                                    </defs>
                                                    <g clip-path="url(#myClip)">
                                                        <g id="money">
                                                            <path d="M441.9,116.54h-162c-4.66,0-8.49,4.34-8.62,9.83l.85,278.17,178.37,2V126.37C450.38,120.89,446.56,116.52,441.9,116.54Z" fill="#699e64" stroke="#323c44" stroke-miterlimit="10" stroke-width="14" />
                                                            <path d="M424.73,165.49c-10-2.53-17.38-12-17.68-24H316.44c-.09,11.58-7,21.53-16.62,23.94-3.24.92-5.54,4.29-5.62,8.21V376.54H430.1V173.71C430.15,169.83,427.93,166.43,424.73,165.49Z" fill="#699e64" stroke="#323c44" stroke-miterlimit="10" stroke-width="14" />
                                                        </g>
                                                        <g id="creditcard">
                                                            <path d="M372.12,181.59H210.9c-4.64,0-8.45,4.34-8.58,9.83l.85,278.17,177.49,2V191.42C380.55,185.94,376.75,181.57,372.12,181.59Z" fill="#a76fe2" stroke="#323c44" stroke-miterlimit="10" stroke-width="14" />
                                                            <path d="M347.55,261.85H332.22c-3.73,0-6.76-3.58-6.76-8v-35.2c0-4.42,3-8,6.76-8h15.33c3.73,0,6.76,3.58,6.76,8v35.2C354.31,258.27,351.28,261.85,347.55,261.85Z" fill="#ffdc67" />
                                                            <path d="M249.73,183.76h28.85v274.8H249.73Z" fill="#323c44" />
                                                        </g>
                                                    </g>
                                                    <g id="wallet">
                                                        <path d="M478,288.23h-337A28.93,28.93,0,0,0,112,317.14V546.2a29,29,0,0,0,28.94,28.95H478a29,29,0,0,0,28.95-28.94h0v-229A29,29,0,0,0,478,288.23Z" fill="#a4bdc1" stroke="#323c44" stroke-miterlimit="10" stroke-width="14" />
                                                        <path d="M512.83,382.71H416.71a28.93,28.93,0,0,0-28.95,28.94h0V467.8a29,29,0,0,0,28.95,28.95h96.12a19.31,19.31,0,0,0,19.3-19.3V402a19.3,19.3,0,0,0-19.3-19.3Z" fill="#a4bdc1" stroke="#323c44" stroke-miterlimit="10" stroke-width="14" />
                                                        <path d="M451.46,435.79v7.88a14.48,14.48,0,1,1-29,0v-7.9a14.48,14.48,0,0,1,29,0Z" fill="#a4bdc1" stroke="#323c44" stroke-miterlimit="10" stroke-width="14" />
                                                        <path d="M147.87,541.93V320.84c-.05-13.2,8.25-21.51,21.62-24.27a42.71,42.71,0,0,1,7.14-1.32l-29.36-.63a67.77,67.77,0,0,0-9.13.45c-13.37,2.75-20.32,12.57-20.27,25.77l.38,221.24c-1.57,15.44,8.15,27.08,25.34,26.1l33-.19c-15.9,0-28.78-10.58-28.76-25.93Z" fill="#7b8f91" />
                                                        <path d="M148.16,343.22a6,6,0,0,0-6,6v92a6,6,0,0,0,12,0v-92A6,6,0,0,0,148.16,343.22Z" fill="#323c44" />
                                                    </g>

                                                </svg>
                                            </button>
                                            <div>
                                                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                                                    <DialogTitle id="form-dialog-title">Order Details</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            Please fill the below details. We will provide your orders within short time.
                                                        </DialogContentText>
                                                        <TextField
                                                            autoFocus
                                                            id="name"
                                                            label="Name"
                                                            type="text"
                                                            fullWidth
                                                            style={{ marginBottom: "20px" }}
                                                            name="name"
                                                            value={addresDetails.name}
                                                            onChange={(e) => handleAddressDetails(e)}
                                                        />
                                                        <TextField

                                                            id="name"
                                                            label="Phone Number"
                                                            type="text"
                                                            fullWidth
                                                            style={{ marginBottom: "20px" }}
                                                            name="phonenumber"
                                                            value={addresDetails.phonenumber}
                                                            onChange={handleAddressDetails}
                                                        />
                                                        <TextField
                                                            label="Address"
                                                            multiline
                                                            fullWidth
                                                            rows={5}
                                                            rowsMax={4}
                                                            name="address"
                                                            value={addresDetails.address}
                                                            style={{ marginBottom: "20px" }}
                                                            onChange={handleAddressDetails}
                                                        />

                                                    </DialogContent>
                                                    <DialogActions style={{ marginBottom: "20px", marginRight: "20px" }}>
                                                        <Button onClick={handleClose} variant="contained" color="primary">
                                                            Cancel
                                                        </Button>
                                                        <Button onClick={handlesuccess} variant="contained" color="primary">
                                                            Order
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                        </div>
                                        <Modal
                                            open={opensuccess}
                                            onClose={handleCloseSuccess}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    You have ordered successfully...!!!
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    We got your response. We will get back to you within a short time. Thanks for yor order.
                                                </Typography>
                                                <Button onClick={handleDone} variant="contained" color="primary">
                                                    Done
                                                </Button>

                                            </Box>
                                        </Modal>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Footer />
                        </div>
                    </div>
                )
            }


        </div >
    )
}

export default Cart
