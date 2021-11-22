import React, { useEffect, useState } from 'react';
import './Delivered.css';
import Axios from 'axios';
import NavPage from '../NavPage/NavPage';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import checkImg from '../../../images/Icons/check.png'

function Delivered() {

    const [deliverState, setDeliverState] = useState([]);
    const [expanded, setExpanded] = React.useState(false);


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = () => {
        Axios.get("https://vgseafoods.herokuapp.com/getDeliverd")
            .then(res => {
                // console.log(res.data)
                setDeliverState(res.data);
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


    const roll = 0;

    console.log(deliverState)

    return (
        <div className="deliver_page">
            <div className="navPage">
                <NavPage />
            </div>
            <div className="deliver_container">
                <div className="main_card">
                    {
                        deliverState.map((item, i) => {
                            const rollNum = i + 1;
                            return (
                                <Accordion key={i} expanded={expanded === item._id} onChange={handleChange(item._id)} className="accordian">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography>
                                            {rollNum}.
                                        </Typography>
                                        <Typography sx={{ width: '33%', flexShrink: 0 }} className="name">
                                            Name : {item.addressDetails.name}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary' }} className="count">Order Count : {item.orderDetails.length}</Typography>
                                        <Typography sx={{ color: 'text.secondary' }} className="amount" >Total Amount : {item.totalAmount}</Typography>
                                        <Typography sx={{ color: 'text.secondary' }} className="time" >{handleTime(item.time)}</Typography>
                                        <Typography sx={{ color: 'text.secondary' }} className="check" >
                                            <img  src={checkImg} alt="img"/>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="typography">
                                            <div className="orderDetails">
                                                {
                                                    item.orderDetails.map((val, il) => {
                                                        return (
                                                            <div key={i} className="order_list">
                                                                <p className="productName" >{val.productName}</p>
                                                                <p >{val.quantity}Kg</p>
                                                                <p >Rs.{val.cost}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="addressDetails">
                                                <span>
                                                    <label>Name : </label>
                                                    <p >{item.addressDetails.name}</p>
                                                </span>

                                                <span>
                                                    <label>Phone : </label>
                                                    <p className="phone" >{item.addressDetails.phonenumber}</p>
                                                </span>
                                                <span>
                                                    <label>Address : </label>
                                                    <p className="address">{item.addressDetails.address}</p>
                                                </span>
                                            </div>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Delivered
