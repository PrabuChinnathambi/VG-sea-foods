import React, { useState } from 'react'
import './Feedback.scss';
import { ToastContainer, toast } from 'react-toastify';

function Feedback() {
    const [data, setData] = useState({
        name: "",
        email: "",
        location: "",
        message: ""
    })

    const handlrFeedBackChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmitFeedback = () => {
        console.log(data);
        toast("Your Feedback submitted successfully...!");

    }

    console.log(data);
    return (
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
            <div className="feedback">
                <form>
                    <h1>Give your kindness feedback</h1>
                    <input placeholder="Name" name="name" type="text" required value={data.name} onChange={handlrFeedBackChange} />
                    <input placeholder="Email" type="text" name="email" required value={data.email} onChange={handlrFeedBackChange} />
                    <input placeholder="Location" type="text" name="location" required value={data.location} onChange={handlrFeedBackChange} />
                    <div className="flex">
                        <textarea placeholder="Message" rows="1" name="message" required value={data.message} onChange={handlrFeedBackChange}></textarea>
                    </div>
                    <button onClick={handleSubmitFeedback} >Send</button>
                </form>

            </div>
        </div>

    )
}

export default Feedback
