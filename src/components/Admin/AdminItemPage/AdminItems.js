import React, { useState, useEffect } from 'react'
import './AdminItems.css';
import Axios from 'axios';
import OpenPage from '../../OpenPage/OpenPage';



function AdminItems() {

    const [productName, SetProductName] = useState("");
    const [cost, SetCost] = useState("");
    const [quantity, SetQuantity] = useState("");
    const [image, SetImage] = useState("");
    const [update, setUpdate] = useState(false);
    const [updateId, setUpdateId] = useState("");
    const [products, SetProducts] = useState([])

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


    const getProducts = () => {
        Axios.get("http://localhost:8000/getItemData")
            .then(res => {
                console.log(res);
                SetProducts(res.data);
            }).catch(err => {
                console.log(err)
            })
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


    const submitProduct = (event) => {

        event.preventDefault()

        const payload = {
            productName: productName,
            cost: cost,
            quantity: quantity,
            image: image
        }

        Axios.post('http://localhost:8000/postItemData', payload)
            .then((result) => {
                getProducts();
            })

        SetProductName("");
        SetCost("");
        SetQuantity("");
        SetImage("");
    }


    const deleteProduct = (productid) => {
        const payload = {
            id: productid
        }

        console.log(payload);
        Axios.post("http://localhost:8000/deleteproduct", payload)
            .then(res => {
                // console.log(res);
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

    const updatenewProduct = () => {

        const payload = {
            id: updateId,
            productName: productName,
            cost: cost,
            quantity: quantity
        }

        Axios.post("http://localhost:8000/updateproduct", payload)
            .then(res => {
                SetProducts("");
                getProducts();
            })
    }






    return (
        <div className="adminItems_page">
            <div>
                <OpenPage />
            </div>
            <div className="adminItems_container">
                <div className="add_product">
                    <div className="row">
                        <div className="col-md-12">
                            <form>
                                <h1>Add Your Product </h1>
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
                                                <input type="file" id="file" aria-label="File browser example" encType="multipart/form-data"
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
            <div>
                <div className="product_container">
                    {
                        products.map(post => {
                            return (
                                <div key={post._id} className="product_card">
                                    <div className="product_details">
                                        <img src={post.image} alt="" />
                                        <span><h4>{post.productName}</h4></span>
                                        <span><h5>Cost : {post.cost}/1KG</h5></span>
                                        <span><h5>Quantity : {post.quantity}</h5></span>
                                    </div>
                                    <div className="product_buttons">
                                        <button className="btn2 second" onClick={() => updateProduct(post._id)}>Update</button>
                                        <button className="btn first" onClick={() => deleteProduct(post._id)}>Delete</button>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default AdminItems
