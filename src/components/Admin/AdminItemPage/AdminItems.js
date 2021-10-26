import React, { useState, useEffect } from 'react'
import './AdminItems.css';
import Axios from 'axios';
import Button from '@mui/material/Button';
import NavPage from '../NavPage/NavPage';
import { ToastContainer, toast } from 'react-toastify';
import BeatLoader from "react-spinners/BeatLoader";
import PulseLoader from "react-spinners/PulseLoader";
import MoonLoader from "react-spinners/MoonLoader";


function AdminItems() {

    const [productName, SetProductName] = useState("");
    const [cost, SetCost] = useState("");
    const [quantity, SetQuantity] = useState("");
    const [image, SetImage] = useState("");
    const [update, setUpdate] = useState(false);
    const [updateId, setUpdateId] = useState("");
    const [products, SetProducts] = useState([])
    const [allProducts, SetAllProducts] = useState([])
    const [deliverdOrders, SetDeliverdOrders] = useState([])
    const [userData, SetUserData] = useState([])
    const [fileInput, setFileInput] = useState("inputFile");
    const [toggle, setToggle] = useState("false");
    const [loader, setLoader] = useState(true);
    const [pulseLoaderID, setPulseLoaderID] = useState([]);
    const [pulseToggler, setPulseToggler] = useState(false);





    useEffect(() => {
        getProducts();

    }, []);


    const getProducts = async () => {
        getAllOrder();
        getDeliverdOrders();
        getAllUser();

        await Axios.get("https://vgseafoods.herokuapp.com/getItemData")
            .then(res => {
                // console.log(res.data)
                SetProducts(res.data);
                setLoader(false);
            }).catch(err => {
                console.log(err)
            });

    }
    const getAllOrder = () => {
        Axios.get("https://vgseafoods.herokuapp.com/getOrders")
            .then(res => {
                SetAllProducts(res.data);
                // console.log(res.data);
            }).catch(err => {
                console.log(err)
            });
    }
    const getDeliverdOrders = () => {
        Axios.get("https://vgseafoods.herokuapp.com/getDeliverd")
            .then(res => {
                SetDeliverdOrders(res.data);
                // console.log(res.data);
            }).catch(err => {
                console.log(err)
            });
    }
    const getAllUser = () => {
        Axios.get("https://vgseafoods.herokuapp.com/getAlluser")
            .then(res => {
                SetUserData(res.data);
                // console.log(res.data);
            }).catch(err => {
                console.log(err)
            });
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)

        SetImage(base64)

    }


    const submitProduct = async (event) => {

        event.preventDefault()
        setPulseToggler(true)

        const payload = {
            productName: productName,
            cost: cost,
            quantity: quantity,
            image: image
        }

        console.log(payload)
        await Axios.post('https://vgseafoods.herokuapp.com/postItemData', payload)
            .then(result => {
                console.log(result)
                toast("Product Added Successfully...!");
                setFileInput("removeInput");
                setToggle(!toggle);
                setPulseToggler(false);
                getProducts();
                SetProductName("");
                SetCost("");
                SetQuantity("");
                SetImage("");

            })



    }


    const deleteProduct = (productid) => {
        setPulseLoaderID(productid);
        const payload = {
            id: productid
        }

        console.log(payload);
        Axios.post("https://vgseafoods.herokuapp.com/deleteproduct", payload)
            .then(res => {
                setPulseLoaderID([])
                setToggle(!toggle);
                getProducts();
                toast("Product Deleted Successfully...!");

            })
    }

    const updateProduct = (productid) => {

        const update = products.filter((x) => x._id === productid);
        // console.log(update);
        setUpdateId(productid);
        setUpdate(true);
        SetProductName(update[0].productName);
        SetCost(update[0].cost);
        SetQuantity(update[0].quantity);
        SetImage(update[0].image);


    }

    const updatenewProduct = (e) => {
        e.preventDefault();
        const payload = {
            id: updateId,
            productName: productName,
            cost: cost,
            quantity: quantity
        }
        console.log(payload);

        Axios.post("https://vgseafoods.herokuapp.com/updateproduct", payload)
            .then(res => {
                console.log(res);
                setUpdate(false);
                getProducts();
                SetProductName("");
                SetCost("");
                SetQuantity("");
                SetImage("");
                toast("Product Updated Successfully...!");

            })
    }



    // console.log(allProducts);
    // console.log(deliverdOrders);
    // console.log(userData);
    // console.log(products);



    return (
        <div className="adminItems_page">
            <div>
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
                <div className="navPage">
                    <NavPage />
                </div>
                <div className="greeting_counts">
                    <div className="clients_counts">
                        <p>Number of Clients</p>
                        <h2>{userData.length}</h2>
                    </div>
                    <div className="total_Book">
                        <p>Total Bookings</p>
                        <h2>{allProducts.length + deliverdOrders.length}</h2>
                    </div>
                    <div className="pending_orders">
                        <p>Pending Orders</p>
                        <h2>{allProducts.length}</h2>
                    </div>
                    <div className="delivered_orders">
                        <p>Delivered Orders</p>
                        <h2>{deliverdOrders.length}</h2>
                    </div>

                </div>
                <div className="adminItems_container">

                    <div className="addProduct_productDetails">
                        <div className="product_container">
                            {
                                products.map(post => {
                                    return (
                                        <div key={post._id} className="product_card">
                                            <div className="product_details">
                                                <img src={post.image} alt="" />
                                                <span><p className="product_name">{post.productName}</p></span>
                                                <span><p>Cost : {post.cost}/1KG</p></span>
                                                <span><p>Quantity : {post.quantity}</p></span>
                                                <Button className="btn" variant="outlined" onClick={() => updateProduct(post._id)}>Update</Button>
                                                <Button  onClick={() => deleteProduct(post._id)} className="btn" variant="outlined" color="error" >Delete</Button>


                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="add_product">
                            <div className="row">
                                <div className="col-md-12">
                                    <form className="form_data">
                                        <h1>Add Product</h1>
                                        <fieldset>
                                            <label>Product Name:</label>
                                            <input type="text" id="name" value={productName} onChange={(e) => { SetProductName(e.target.value) }} />

                                            <label>Cost:</label>
                                            <input type="text" id="name" value={cost} onChange={(e) => { SetCost(e.target.value) }} />

                                            <label>Quantity:</label>
                                            <input type="text" id="name" value={quantity} onChange={(e) => { SetQuantity(e.target.value) }} />

                                            {
                                                update ? "" :
                                                    <label className="file">
                                                        <input key={fileInput} type="file" id="file" aria-label="File browser example" encType="multipart/form-data"
                                                            required onChange={handleFileRead} />
                                                        <span className="file-custom"></span>
                                                    </label>

                                            }


                                        </fieldset>
                                        {
                                            update ? <button type="submit" onClick={updatenewProduct}>Update</button> : <button type="submit" onClick={submitProduct}>{
                                                pulseToggler ? <span><PulseLoader color="white" size={8} ></PulseLoader></span> : <span>Submit</span>
                                            }</button>
                                        }

                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>


        </div>

    )
}

export default AdminItems
