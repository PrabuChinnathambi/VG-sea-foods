import React, { useState } from 'react'
import './Login.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';



function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(true);
    const [signUp, setSignUp] = useState({
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    })
    const [signIn, setSignIn] = useState({
        email: "",
        password: "",
    })
    const [userData, setUserData] = useState([]);

    
    const user = useSelector((state) => state.user);


    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleSignUpChange = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
    }

    const handleSignInChange = (e) => {
        setSignIn({ ...signIn, [e.target.name]: e.target.value });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(signIn.email);


        if (signIn.email === "" || signIn.password === "") {
            const requireError = () => toast("All Feilds are Required");
            requireError();
        }
        else if (!result) {
            const emailError = () => toast("Email id is Incorrect");
            emailError();
        } else {
            const payload = {
                email: signIn.email,
                password: signIn.password
            }
            Axios.post('https://vgseafoods.herokuapp.com/loginUser', payload)
                .then(res => {
                    dispatch(setUser(res.data.userData));
                    localStorage.setItem("token", res.data.token);
                    console.log(localStorage.getItem("token"));
                    setSignIn({
                        email: "",
                        password: ""
                    })

                    history.push('/home');
                    // history.go(0)
                }).catch(err => {
                    console.log(err)
                    toast.error(err.response.data.message);

                })
        }
    }


    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log(signUp.email);
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(signUp.email);


        if (signUp.email === "" || signUp.phoneNumber === "" || signUp.password === "" || signUp.confirmPassword === "") {
            toast("All Feilds are Required")
        }
        else if (!result) {
            toast("Email Id is Incorrect");
        }
        else if (signUp.phoneNumber.length !== 10) {
            toast("Phone number should have 10 digit");
        }
        else if (signUp.password !== signUp.confirmPassword) {
            toast("Password should be same");
        } else {
            const payload = {
                email: signUp.email,
                phoneNumber: signUp.phoneNumber,
                password: signUp.password,
                confirmPassword: signUp.confirmPassword
            }

            await Axios.post('https://vgseafoods.herokuapp.com/registerUser', payload)
                .then(data => {
                    console.log(data);
                    toast("User Registerd Successfully!");

                    setSignUp({
                        email: "",
                        phoneNumber: "",
                        password: "",
                        confirmPassword: ""
                    })
                    setToggle(!toggle);

                })
                .catch(err => {
                    toast.error(err.response.data.message);
                })

        }

    }

    // console.log(user)
    if (user) {
        let userVal = JSON.stringify(user);
        console.log(user)
        localStorage.setItem("userData", userVal);
        // let userNew = JSON.parse(localStorage.getItem("userData"));
        // console.log(userNew)
    }
    // console.log(signUp)
    // console.log(signIn)
    return (
        <div className="login_page">
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
            <div className="container" id="container">
                {
                    toggle ? (
                        <div className="form-container sign-in-container">
                            <form>
                                <h1 className="heading">Sign in</h1>
                                <input type="email" placeholder="Email" name="email" value={signIn.email} onChange={handleSignInChange} />
                                <input type="password" placeholder="Password" name="password" value={signIn.password} onChange={handleSignInChange} />
                                {/* <a href="">Forgot your password?</a> */}
                                <button onClick={handleLogin}>Log In</button>
                            </form>
                        </div>
                    ) : (
                        <div className="form-container sign-in-container" >
                            <form>
                                <h1>Register Account</h1>
                                <input type="email" placeholder="Email" name="email" value={signUp.email} onChange={handleSignUpChange} />
                                <input type="number" placeholder="Phone Number" name="phoneNumber" min="1" max="10" value={signUp.phoneNumber} onChange={handleSignUpChange} />
                                <input type="password" placeholder="Password" name="password" value={signUp.password} onChange={handleSignUpChange} />
                                <input type="text" placeholder="Confirm Password" name="confirmPassword" value={signUp.confirmPassword} onChange={handleSignUpChange} />
                                <button onClick={handleSignUp}>Register</button>
                            </form>
                        </div>
                    )
                }

                <div className="overlay-container">

                    <div className="overlay">
                        {
                            toggle ? (
                                <div className="overlay-panel overlay-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>If you don't have account please register </p>
                                    <button className="ghost" id="signUp" onClick={handleToggle}>Sign Up</button>
                                </div>
                            ) : (
                                <div className="overlay-panel overlay-right">
                                    <h1>Hello, Dude!</h1>
                                    <p>Enter your personal details and start journey with us</p>
                                    <button className="ghost" id="signUp" onClick={handleToggle}>Login</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Login
