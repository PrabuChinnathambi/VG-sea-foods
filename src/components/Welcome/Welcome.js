import React from 'react';
import './Welcome.css';
import logo from '../../images/newlogo2.png';
import { Typewriter } from 'react-simple-typewriter';
import { Button, ButtonGroup } from '@material-ui/core';
import {Link} from 'react-router-dom'


function Welcome() {

    const handleType = (count) => {
        // access word count number
        // console.log(count)
    }

    const handleDone = () => {
        // console.log(`Done after 5 loops!`)
    }



    return (
        <div className="welcome_page">
            <div className="logo">
                <img src={logo} alt="logo" />
                <p>Sea Foods</p>
            </div>
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
            <div>
                <ButtonGroup className="button_group" variant="outlined" aria-label="outlined primary button group"  >
                    <Link style={{ textDecoration : "none"}} to="/login"><Button className="button">Login</Button></Link>
                </ButtonGroup>
            </div>
            <div className="admint_button_div">
                <ButtonGroup className="admin_group" variant="outlined" aria-label="outlined primary button group"  >
                    <Link style={{ textDecoration : "none"}} to="/adminLogin"><Button className="admin_button">Admin</Button></Link>
                </ButtonGroup>
            </div>


        </div>
    )
}

export default Welcome
