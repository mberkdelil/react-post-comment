import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import logo from "../images/react.jpg"

const MessageDetails = () => {
    const { id } = useParams();
    const navigator = useNavigate();
    const [textDetail, setTextDetail] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({ display_name: "", body: "" });

    useEffect(() => {
        api().get(`/posts/${id}`)
            .then(response => setTextDetail(response.data))
            .catch(error => console.log(error));

        api().get(`/posts/${id}/comments`)
            .then(response => setComments(response.data))
            .catch(error => console.log(error))
    }, []);

    const commentSubmit = comment => {
        if (comment.display_name === "") {
            return alert("Display Name Field Cannot Be Empty!")
        } else if (comment.body === "") {
            return alert("Body Field Cannot Be Empty!")
        } else {
            api().post(`/posts/${id}/comments`, comment)
                .then(response => {
                    setComments([...comments, response.data]);
                    setComment({ display_name: "" });
                    setComment({ body: "" });
                })
                .catch(error => console.log(error))
        }
    }

    const deleteComment = (commentId) => {
        api().delete(`/posts/${id}/comments/${commentId}`)
            .then(response => window.location.reload())
            .catch(error => console.log(error))
    };

    const deletePost = () => {
        api().delete(`/posts/${id}`)
            .then(response => navigator("/"))
            .catch(error => console.log(error))
    };

    return (
        <>
            <h2 className='ui header'>{textDetail.title}</h2>
            <p>{textDetail.created_at}</p>
            <p>{textDetail.content}</p>
            <div className='ui buttons'>
                <Link to={`/posts/${id}/edit`} className='ui violet button'>Edit</Link>
                <button onClick={deletePost} className='ui red button'>Delete</button>
            </div>
            <h3>Comments</h3>
            {
                comments.map(comment => (
                    <div className="ui relaxed list" key={comment.id}>
                        <div className="item" key={comment.id}>
                            <img className="ui avatar image" src={logo} alt={comment.display_name} />
                            <div className="content">
                                <a className="header">{comment.display_name}</a>
                                <div className="description"><b>{comment.body}</b></div>
                            </div>

                        </div>
                        <Link to={`/posts/${id}/comments/${comment.id}`} className='ui green button'>Edit</Link>
                        <button onClick={() => deleteComment(comment.id)} className='ui red button'>Delete</button>
                    </div>
                ))
            }
            <h3>Write Comment</h3>
            <form className='ui form' onSubmit={e => {
                e.preventDefault();
                commentSubmit(comment);
            }}>
                <div style={{ border: "1px solid black" }} className='ui mini icon input'>
                    <input onChange={e => setComment({ ...comment, display_name: e.target.value })} value={comment.display_name} type="text"
                        placeholder='Your Name...' />
                </div>
                <textarea onChange={e => setComment({ ...comment, body: e.target.value })} value={comment.body}
                    style={{ border: "1px solid black" }} placeholder='Write Comment...' rows="3"></textarea>
                <button className='ui green button' type="submit">Comment Submit</button>
                <Link to="/" style={{ color: "black" }} className='ui yellow button'>Go To Post List</Link>
            </form>
        </>
    )
}

export default MessageDetails