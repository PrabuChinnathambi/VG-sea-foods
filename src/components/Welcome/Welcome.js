import React from 'react';
import './Welcome.css';
import logo from '../../images/newlogo2.png';
import { Typewriter } from 'react-simple-typewriter';
import { Button, ButtonGroup } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerToggle, loginToggle } from '../../redux/actions/userActions'

function Welcome() {


    const dispatch = useDispatch();



    const handleType = (count) => {
        // access word count number
        // console.log(count)
    }

    const handleDone = () => {
        // console.log(`Done after 5 loops!`)
    }

    const handleRegisterToggle = () => {

        dispatch(registerToggle());
    }

    const handleLoginToggle = () => {

        dispatch(loginToggle());
    }






    return (
        <div className="welcome_page">
            <div className="welcome_container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <p>Sea Foods</p>
                </div>
                <div>
                <div className="greeting_msg">
                    <p className="greeting_head">Our <span style={{ color: 'red', fontWeight: 'bold' }}>Promise</span></p>
                    <p className="greeting_body">Most companies have fancy mission statements. Ours is simple. We want to help you eat the best meat possible. That's it.  </p>
                </div>
                <div className="typewriter">
                    <h1>
                        Life is simple{' '}
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                            <Typewriter
                                words={['Eat', 'Sleep', 'Repeat!']}
                                loop={5}
                                cursor
                                cursorStyle='_'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                                onLoopDone={handleDone}
                                onType={handleType}
                            />
                        </span>
                    </h1>
                </div>
                <div className="welcome_buttons">
                    <ButtonGroup className="button_group" variant="outlined" aria-label="outlined primary button group"  >
                        <Link onClick={handleLoginToggle} style={{ textDecoration: "none" }} to="/login"><Button className="button">Login</Button></Link>
                    </ButtonGroup>
                    <ButtonGroup className="button_group" variant="outlined" aria-label="outlined primary button group"  >
                        <Link onClick={handleRegisterToggle} style={{ textDecoration: "none" }} to="/login"><Button className="button">Register</Button></Link>
                    </ButtonGroup>
                </div>
                </div>
                <div className="admint_button_div">
                    <ButtonGroup className="admin_group" variant="outlined" aria-label="outlined primary button group"  >
                        <Link style={{ textDecoration: "none" }} to="/adminLogin"><Button className="admin_button">Admin</Button></Link>
                    </ButtonGroup>
                </div>

            </div>
        </div>
    )
}

export default Welcome
