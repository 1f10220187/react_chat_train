import { Button } from '@mui/material'
import React from 'react'
import firebase from "firebase/compat/app"
import {auth} from "../firebase.js"

function SignIn() {
    function signInWithGoogle(){
        const probider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(probider);
    }
  return (
    <div>
      <Button onClick={signInWithGoogle}>グーグルでログインする</Button>
    </div>
  )
}

export default SignIn
