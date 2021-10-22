import React, { useState, useEffect } from 'react'
import './AdminItems.css';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import NavPage from '../NavPage/NavPage';
import { ToastContainer, toast } from 'react-toastify';


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


    useEffect(() => {
        getProducts();

    }, []);


    const getProducts = async () => {
        getAllOrder();
        getDeliverdOrders();
        getAllUser();
        await Axios.get("https://vgseafoods.herokuapp.com/getItemData")
            .then(res => {
                console.log(res.data)
                SetProducts(res.data);
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
                console.log(res.data);
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

        const payload = {
            productName: productName,
            cost: cost,
            quantity: quantity,
            image: image
        }

        console.log(payload)
        await Axios.post('https://vgseafoods.herokuapp.com/postItemData', payload)
            .then((result) => {
                console.log(result)
                getProducts();
            })

        SetProductName("");
        SetCost("");
        SetQuantity("");
        SetImage("");
        setFileInput("removeInput");

    }


    const deleteProduct = (productid) => {
        const payload = {
            id: productid
        }

        console.log(payload);
        Axios.post("https://vgseafoods.herokuapp.com/deleteproduct", payload)
            .then(res => {
                toast("Product Deleted Successfully...!");
                getProducts();
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
            })
    }



    // console.log(allProducts);
    // console.log(deliverdOrders);
    // console.log(userData);
    console.log(products);



    return (
        <div className="adminItems_page">
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
                                            <Button className="btn" variant="outlined" color="error" onClick={() => deleteProduct(post._id)}>Delete</Button>
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
                                        update ? <button type="submit" onClick={updatenewProduct}>Update</button> : <button type="submit" onClick={submitProduct}>Submit</button>
                                    }

                                </form>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )
}

export default AdminItems
