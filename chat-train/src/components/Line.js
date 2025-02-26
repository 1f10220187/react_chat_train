import React, { useEffect, useRef, useState } from 'react';
import SignOut from './SignOut';
import {db , auth} from "../firebase.js";
import SendMessage from './SendMessage.js';
import { useParams } from "react-router-dom";
import InviteUser from './InviteUser.js';

function Line() {
    const [messages,setMessages] = useState([]);
    const scrollRef = useRef(null);
    const { roomId } = useParams();

    useEffect(() => {
        db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("createdAt")
        .limit(50)
        .onSnapshot((snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
    },[roomId]);

    useEffect(() => {
        if(scrollRef.current){
            scrollRef.current.scrollIntoView({behavior: "smooth"});
        }
    },[messages]);

  return (
    <div>
        {console.log(messages)}
      <SignOut />
      <InviteUser roomId={roomId}/>
      <div className='msgs' style={{ overflowY: "auto", maxHeight: "500px" }}>
        {messages.map(({id,text,photoURL,uid}) => (
            <div key={id} className={`msg ${uid === auth.currentUser.uid ? "send" : "receive"}`}>
                <p>{text}</p>
                <img src={photoURL} alt="icon" />
            </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <SendMessage />
    </div>
  )
}

export default Line
