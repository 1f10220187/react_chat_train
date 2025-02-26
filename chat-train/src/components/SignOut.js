import { Button } from '@mui/material';
import {auth} from "../firebase.js";
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className='header'>
    <h3 className='userName'>ユーザー名： {auth.currentUser.displayName}</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {location.pathname !== "/" ? <button className='toRooms' onClick={() => navigate("/")}>ルーム一覧へ</button>
        : null}
      <Button onClick={() => auth.signOut()}
        style={{
            backgroundColor: "#cc3d3d", /* 赤系のサインアウトボタン */
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
            marginLeft: "auto",
            marginRight: "10px",
        }}onMouseOver={(e) => e.target.style.backgroundColor = "#a02d2d"}  // ホバー時の色変更
        onMouseOut={(e) => e.target.style.backgroundColor = "#cc3d3d"}   // 元の色に戻す
        onMouseDown={(e) => e.target.style.transform = "scale(0.95)"}    // クリック時に縮小
        onMouseUp={(e) => e.target.style.transform = "scale(1)"}        // 元のサイズに戻す
        >
        サインアウト
      </Button>
      </div>
    </div>
  )
}

export default SignOut
