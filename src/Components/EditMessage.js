import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api';

const EditMessage = () => {
    const { id } = useParams();
    const navigator = useNavigate();
    const [editMessage, setEditMessage] = useState({ title: "", content: "" });

    useEffect(() => {
        api().get(`/posts/${id}`)
            .then(response => setEditMessage({ title: response.data.title, content: response.data.content }))
            .catch(error => console.log(error))
    }, [])
    console.log(editMessage);

    const submitEditMessage = e => {
        e.preventDefault();

        api().put(`/posts/${id}`, editMessage)
            .then(response => navigator(`/posts/${id}`))
            .catch(error => console.log(error));
    };

    return (
        <div className='ui form'>
            <div className='field'>
                <label>Message Title</label>
                <input onChange={e => setEditMessage({ ...editMessage, title: e.target.value })} value={editMessage.title} type="text" />
            </div>
            <div className='field'>
                <label>Message Content</label>
                <textarea onChange={e => setEditMessage({ ...editMessage, content: e.target.value })} value={editMessage.content}
                    rows="3"></textarea>
            </div>
            <button onClick={submitEditMessage} className='ui primary button'>Edit</button>
            <Link to={`/posts/${id}`} className='ui button'>Cancel</Link>
        </div>
    )
}

export default EditMessage