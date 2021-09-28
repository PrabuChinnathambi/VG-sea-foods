import React, { useState } from 'react'
import './AdminHome.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';


function AdminHome() {

    const history = useHistory();

    const [username, setUsename] = useState("");
    const [password, setPassword] = useState("");
    const [admincnfm, setAdmincnfm] = useState(false);


    const submitLogin = () => {
        const payload = {
            username: username,
            password: password
        }

        Axios.post("https://vgseafoods.herokuapp.com/loginAdmin", payload)
            .then((result) => {
                let cnfm = result.data.message;
                if(cnfm === "Success"){
                    history.push('/adminDashboard');
                }
            })
    }

    return (
        <div className="admin_login">
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

export default AdminHome
