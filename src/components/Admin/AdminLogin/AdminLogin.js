import React, { useEffect, useState } from 'react'
import './AdminLogin.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {getAdminProducts} from '../../../redux/actions/userActions'

function AdminLogin() {

    const history = useHistory();
    const dispatch = useDispatch()

    const [username, setUsename] = useState("");
    const [password, setPassword] = useState("");
    const [admincnfm, setAdmincnfm] = useState(false);

    useEffect(() => {
        
        Axios.get("http://localhost:8000/getItemData")
            .then(res => {
                dispatch(getAdminProducts(res.data));
            }).catch(err => {
                console.log(err)
            });
    })


    const submitLogin = () => {
        const payload = {
            username: username,
            password: password
        }
        if (username === "" || password === "") {
            toast("All feilds are required");
        } else {
            Axios.post("https://vgseafoods.herokuapp.com/loginAdmin", payload)
                .then((result) => {
                    console.log(result)
                    history.push('/adminDashboard');

                }).catch((err) => {
                    toast(err.response.data.message);
                })
        }

    }

    return (
        <div className="admin_login">
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
            <div>
                <div className="login-wrap">
                    <div className="login-html">
                        <input id="tab-1" type="radio" name="tab" className="sign-in" checked /><label for="tab-1" className="tab">Sign In</label>
                        <input id="tab-2" type="radio" name="tab" className="sign-up" /><label for="tab-2" className="tab"></label>
                        <div className="login-form">
                            <div className="sign-in-htm">
                                <div className="group">
                                    <label for="user" className="label">Username</label>
                                    <input id="user" type="text" value={username} className="input" onChange={(e) => setUsename(e.target.value)} />
                                </div>
                                <div className="group">
                                    <label for="pass" className="label">Password</label>
                                    <input id="pass" type="password" value={password} className="input" data-type="password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="group">
                                    <input id="check" type="checkbox" className="check" checked />
                                    <label for="check"><span className="icon"></span> Keep me Signed in</label>
                                </div>
                                <div className="group">
                                    <input type="submit" onClick={submitLogin} className="button" value="Sign In" />
                                </div>
                                <div className="hr"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
