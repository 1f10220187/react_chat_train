import { Button } from '@mui/material'
import React from 'react'
import firebase from "firebase/compat/app"
import {auth , db} from "../firebase.js"
import { useNavigate } from "react-router-dom"; 

function SignIn() {
  const navigate = useNavigate(); // ナビゲーション関数を取得
    function signInWithGoogle(){
        const probider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(probider).then((result) => {
          const user = result.user;
          if(user){
            const userRef = db.collection("users").doc(user.uid);
            userRef.get().then((doc) => {
              if(!doc.exists){
                userRef.set({
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                })
              }
            })
            navigate("/");
          }
        });
    }
  return (
    <div>
      <Button onClick={signInWithGoogle}>グーグルでログインする</Button>
    </div>
  )
}

export default SignIn
