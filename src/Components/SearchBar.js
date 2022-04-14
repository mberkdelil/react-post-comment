import React from 'react'
import { Link } from 'react-router-dom'

const SearchBar = () => {

    return (
        <div style={{ width: "100%" }} className="ui right labeled left icon input">
            <i className="tags icon"></i>
            <input type="text" placeholder="Use the Side Button to Add a New Post." />
            <Link to="/addnewmessage" style={{ backgroundColor: "brown", color: "white" }} className="ui tag label">
                Add New Post
            </Link>
        </div>
    )
}

export default SearchBar