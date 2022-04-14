import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api';

const EditComment = () => {
    const { id } = useParams();
    const navigator = useNavigate();
    const post_id = window.location.pathname.split("/")[2];
    const [editComment, setEditComment] = useState({ display_name: "", body: "" })

    useEffect(() => {
        api().get(`/posts/${post_id}/comments`)
            .then(response => {
                response.data.map(res => res.id === Number(id) ? setEditComment({
                    display_name: res.display_name,
                    body: res.body
                }) : "0")
            })
            .catch(error => console.log(error))
    }, [])

    const editCommentSubmit = e => {
        e.preventDefault();

        api().put(`/posts/${post_id}/comments/${id}`, editComment)
            .then(response => {
                navigator(`/posts/${post_id}`)
            })
            .catch(error => console.log(error))
    }

    

    console.log(id);
    return (
        <div className='ui form'>
            <div className='field'>
                <label>Display Name</label>
                <input onChange={() => alert("Display Name Cannot Be Changed.")} value={editComment.display_name} type="text" />
            </div>
            <div className='field'>
                <label>Comment Body</label>
                <textarea onChange={e => setEditComment({ ...editComment, body: e.target.value })} value={editComment.body} rows="3"></textarea>
            </div>
            <button onClick={editCommentSubmit} type="submit" className='ui primary button'>Submit</button>
            <Link to={`/posts/${post_id}`} className='ui button'>Cancel</Link>
        </div>
    )
}

export default EditComment