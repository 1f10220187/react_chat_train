import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import SignOut from "./SignOut";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [memberNames, setMemberNames] = useState({});

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("rooms")
        .where("members", "array-contains", user.uid)
        .onSnapshot((snapshot) => {
          const roomData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setRooms(roomData);

          roomData.forEach((room) => {
            if (!room.members || !Array.isArray(room.members) || room.members.length === 0) return;


            const fetchMemberNames = async () => {
              const memberPromises = room.members.slice(0,3).map(async (uid) =>{
                const userDoc = await db.collection("users").doc(uid).get();
                return userDoc.exists ? userDoc.data().displayName : "Unknown";

              })
              const names = await Promise.all(memberPromises);
              setMemberNames((prev) => ({ ...prev, [room.id]: names}));
            };
            fetchMemberNames();
          })
        });

      return () => unsubscribe();
    }
  }, [user]);

  const createRoom = async () => {
    const roomName = prompt("新しいルーム名を入力してください");
    if (roomName) {
      const newRoomRef = await db.collection("rooms").add({
        name: roomName,
        createdAt: new Date(),
        owner: user.uid,
        members: [user.uid],
        lastMessageAt: null,
      });
      navigate(`/room/${newRoomRef.id}`);
    }
  };

  const deleteRoom = async (roomId) => {
    if(!window.confirm("本当にこのルームを削除しますか？")) return;

    try{
      await db.collection('rooms').doc(roomId).delete();
      alert('ルームを削除しました');
    }catch(error){
      console.error("ルーム削除に失敗",error);
      alert("ルームの削除に失敗しました");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
    <SignOut />

    <h1 style={{ marginBottom: "40px", fontSize: "72px", fontWeight:"initial" }}>
      参加中のルーム
    </h1>

    <div style={{ display: "grid", gap: "15px", maxWidth: "400px", margin: "0 auto" }}>
      {rooms.map((room) => (
        <div key={room.id} className="room-container">
          <button  
          className="room"
          onClick={() => navigate(`/room/${room.id}`)}
        >
          <div className="room-name">{room.name}</div>
          <div className="room-members">
              {memberNames[room.id]?.map((name, index) => (
                <span key={index} className="member-name">{name} </span>
              ))}
              {room.members.length > 3 && <span>…</span>}
            </div>
        </button>
        <button 
          className="delete-room" 
          onClick={(e) => {
            e.stopPropagation(); // ルームに入る処理を防ぐ
            deleteRoom(room.id);
          }}
        >
          削除
        </button>
        </div>
      ))}
    </div>

    <Button 
      onClick={createRoom} 
      variant="contained" 
      color="primary" 
      style={{
        marginTop: "30px", 
        fontSize: "18px",
        padding: "12px 24px",
        borderRadius: "8px",
        fontWeight: "bold"
      }}
    >
      新しいルームを作成
    </Button>
  </div>
  );
}

export default Rooms;
