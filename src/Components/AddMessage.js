import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

const AddMessage = () => {
    const navigator = useNavigate();
    const [message, setMessage] = useState({ title: "", content: "" });

    const messageSubmit = e => {
        e.preventDefault();

        if (message.title === "") {
            return alert("Title Field Cannot Be Empty!")
        } else if (message.content === "") {
            return alert("Content Field Cannot Be Empty!")
        } else {
            api().post("/posts", message)
                .then(response => {
                    alert("Your Message Has Been Added Successfully. You Are Redirected To The Homepage. Please Wait...");
                    navigator("/");
                })
                .catch(error => console.log(error))
        }
    };

    return (
        <div className='ui form'>
            <div className='field'>
                <label>Message Title</label>
                <input onChange={e => setMessage({ ...message, title: e.target.value })} value={message.title} type="text" />
            </div>
            <div className='field'>
                <label>Message Content</label>
                <textarea onChange={e => setMessage({ ...message, content: e.target.value })} value={message.content} rows="3"></textarea>
            </div>
            <button onClick={messageSubmit} className='ui primary button'>Submit</button>
            <Link to="/" className='ui button'>Cancel</Link>
        </div>
    )
}

export default AddMessage