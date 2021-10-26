import Axios from 'axios'
import React, { useEffect, useState } from 'react';
import './OrderDetails.css'
import NavPage from '../NavPage/NavPage';
import { Button } from '@material-ui/core';
import PulseLoader from "react-spinners/PulseLoader";
import { ToastContainer, toast } from 'react-toastify';

function OrderDetails() {

    const [orderData, setOrderData] = useState([]);
    const [deleteLoader, setDeleteLoader] = useState([]);

    useEffect(() => {
        getProducts();

    }, [])

    const getProducts = () => {
        Axios.get("https://vgseafoods.herokuapp.com/getOrders")
            .then(res => {
                // console.log(res.data)
                setOrderData(res.data);
                setDeleteLoader([]);
            }).catch(err => {
                console.log(err.message)
            })
    }

    const handleTime = (time) => {
        // console.log(time)
        const d = new Date(time);
        const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
        return date;
    }

    const handleDeliverdClick = (item) => {
        setDeleteLoader(item._id);
        const payload = {
            data: item
        }
        // console.log(payload);
        Axios.post('https://vgseafoods.herokuapp.com/deliverOrder', payload)
            .then(res => {
                toast("Product Delivered Successfully...!");
                console.log(res);
                deleteOrderData(item._id);
            }).catch(err => {
                console.log(err);
            })
    }

    const deleteOrderData = (id_num) => {
        const payload = {
            id: id_num
        }
        Axios.post('https://vgseafoods.herokuapp.com/deleteOrderProduct', payload)
            .then(res => {
                console.log(res);
                // toast("Product removed from cart")
                getProducts();

            }).catch(err => {
                console.log(err);
            })
    }


    console.log(orderData)


    return (
        <div className="admin_orderPage">
            <div className="navPage">
                <NavPage />
            </div>
            <div className="order_container">
                <ToastContainer
                    position="top-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {
                    orderData.slice().reverse().map(item => {
                        return (
                            <div className="orders" key={item._id}>
                                <div>
                                </div>
                                <span>
                                    <label>Name : </label>
                                    <p className="name">{item.addressDetails.name}</p>
                                </span>

                                <span>
                                    <label>Phone : </label>
                                    <p className="phone" >{item.addressDetails.phonenumber}</p>
                                </span>
                                <span>
                                    <label>Address : </label>
                                    <p className="address">{item.addressDetails.address}</p>
                                </span>

                                <p className="time">{handleTime(item.time)}</p>

                                <div className="amount">
                                    <label>Amount : </label>
                                    <p>Rs.{item.totalAmount}</p>
                                </div>
                                <div className="btn_deliverd">
                                    <Button onClick={() => handleDeliverdClick(item)} variant="contained" color="secondary" className="delete_button">
                                        Deliver
                                        {/* {
                                            deleteLoader === item._id ? <span><PulseLoader color="white" size={8} ></PulseLoader></span> : <span>Deliverd</span>
                                        } */}
                                    </Button>
                                    {/* <Button  variant="contained" color="primary"></Button> */}
                                </div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        OrderDetails
                                    </button>
                                    <div className="dropdown-menu">
                                        {
                                            item.orderDetails.map(val => {
                                                return (
                                                    <div className="dropdown_list">
                                                        <p className="product_name">{val.productName}</p>
                                                        <p >{val.quantity}Kg</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>


                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OrderDetails
