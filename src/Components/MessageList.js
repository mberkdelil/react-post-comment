import React from 'react'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { api } from '../api';
import SearchBar from './SearchBar';

const MessageList = () => {

    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        api().get("/posts")
            .then(response => setMessageList(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <SearchBar messageList={messageList} />
            <div className="ui relaxed divided list">
                {
                    messageList.map(write => (
                        <div className="item" key={write.id}>
                            <i className="large github middle aligned icon"></i>
                            <div className="content">
                                <Link to={`/posts/${write.id}`} style={{ textDecoration: "underline" }}
                                    className="header">{write.title}</Link>
                                <div className="description">{write.created_at} {" "} <Link to={`/posts/${write.id}`}> >Message Details</Link> </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MessageList