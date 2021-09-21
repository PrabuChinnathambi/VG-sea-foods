import React from 'react'
import './Feedback.scss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function Feedback() {
    return (
        <div className="feedback">
            <form>
                <h1>Give your kindness feedback</h1>
                <input placeholder="Name" type="text" required />
                <input placeholder="Email" type="text" required />
                <input placeholder="Location" type="text" required />
                <div className="flex">
                    <textarea placeholder="Message" rows="1" required></textarea>
                </div>
                <button>Send</button>

            </form>

        </div>
    )
}

export default Feedback
