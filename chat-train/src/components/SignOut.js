import { Button } from '@mui/material';
import {auth} from "../firebase.js";
import React from 'react';

function SignOut() {
  return (
    <div className='header'>
    <h3 className='userName'>ユーザー名： {auth.currentUser.displayName}</h3>
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
        }}>
        サインアウト
      </Button>
      
    </div>
  )
}

export default SignOut
