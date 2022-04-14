import { Routes, Route } from "react-router-dom"
import MessageList from "./Components/MessageList";
import MessageDetails from "./Components/MessageDetails";
import AddMessage from "./Components/AddMessage";
import EditMessage from "./Components/EditMessage";
import EditComment from "./Components/EditComment";


function App() {


  return (
    <div className="main_wrapper">
      <header></header>
      <div className="ui raised very padded text container segment">
        <Routes>
          <Route path="/" element={<MessageList />} />
          <Route path="/posts/:id" element={<MessageDetails />} />
          <Route path="/addnewmessage" element={<AddMessage />} />
          <Route path="/posts/:id/edit" element={<EditMessage />} />
          <Route path="/posts/:post_id/comments/:id" element={<EditComment />} />
        </Routes>
      </div>
    </div>


  );
}

export default App;
