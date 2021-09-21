import axios from 'axios'
import React, { useEffect, useState } from 'react';
import './OrderDetails.css'
import OpenPage from '../../OpenPage/OpenPage';

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
            <div className="nav">
                <OpenPage />
            </div>
            <div className="order_container">
                {
                    orderData.slice().reverse().map(item => {
                        return (
                            <div className="orders">
                                <label>Name : </label>
                                <p className="name">{item.addressDetails.name}</p>
                                <label>Phonenumber : </label>
                                <p className="phone" >{item.addressDetails.phonenumber}</p>
                                <label>Address : </label>
                                <p className="address">{item.addressDetails.address}</p>


                                <div className="btn-group">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        OrderDetails
                                    </button>
                                    <div className="dropdown-menu">
                                        {
                                            item.orderDetails.map(val => {
                                                return (
                                                    <div className="dropdown_list">
                                                        <p className="name">{val.productName}</p>
                                                        <p >{val.quantity}Kg</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <p>{handleTime(item.time)}</p>

                                <div className="amount">
                                    <label>Amount : </label>
                                    <p>{item.totalAmount}</p>
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
