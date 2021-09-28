import axios from 'axios'
import React, { useEffect, useState } from 'react';
import './OrderDetails.css'
import NavPage from '../NavPage/NavPage';
import { Button } from '@material-ui/core';

function OrderDetails() {

    const [orderData, setOrderData] = useState([]);

    useEffect(() => {

        axios.get("https://vgseafoods.herokuapp.com/getOrders")
            .then(res => {
                // console.log(res.data)
                setOrderData(res.data);
            }).catch(err => {
                console.log(err.message)
            })

    }, [])

    const handleTime = (time) => {
        console.log(time)
        const d = new Date(time);
        const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
        return date;
    }


    console.log(orderData)


    return (
        <div className="admin_orderPage">
            <div className="navPage">
                <NavPage />
            </div>
            <div className="order_container">
                {
                    orderData.slice().reverse().map(item => {
                        return (
                            <div className="orders">
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
                                    <Button variant="contained" color="primary">Deliverd</Button>
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
