import React, { useState } from 'react'
import {db , auth} from "../firebase.js"
import firebase from "firebase/compat/app"
import { Input } from '@mui/material';
import SendIcon from "@mui/icons-material/Send"

function SendMessage() {
  const [message, setMessage] = useState("");
  function sendMessage(e){
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    db.collection("messages").add({
      text: message,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
  }
  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className='sendMsg'>
          <Input 
          style={{
            flex: 1,
            padding: "8px",
            border: "none",
            borderRadius: "20px",
            outline: "none",
          }}
          placeholder='メッセージを入力してください' 
          type='text' 
          onChange={(e) => setMessage(e.target.value)}
          value={message}/>
          <SendIcon style={{ cursor: "pointer", marginLeft: "10px", color: "#007bff" }}
          onClick={sendMessage} />
        </div>
      </form>
    </div>
  )
}

export default SendMessage
