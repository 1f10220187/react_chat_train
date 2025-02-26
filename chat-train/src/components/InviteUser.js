import React, { useState } from "react";
import { db } from "../firebase";
import { Modal, Button, TextField } from "@mui/material";
import firebase from "firebase/compat/app"
import "firebase/compat/firestore";


function InviteUser({ roomId }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleInvite = async () => {
    setError("");
    if (!email) return setError("メールアドレスを入力してください");
    
    try {
      const userQuery = await db.collection("users").where("email", "==", email).get();
      if (userQuery.empty) {
        setError("このユーザーは登録されていません");
        return;
      }

      const userId = userQuery.docs[0].id;
      await db.collection("rooms").doc(roomId).update({
        members: firebase.firestore.FieldValue.arrayUnion(userId)
      });
      
      setOpen(false);
      setEmail("");
      alert("招待しました！");
    } catch (err) {
      console.error("招待エラー", err);
      setError("招待に失敗しました");
    }
  };

  return (
    <div style={{display: "flex"}}>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}
        style={{
            fontSize: "18px", // 文字を大きく
            padding: "12px 20px", // 余白を広めに
            borderRadius: "8px", // 角を丸く
            fontWeight: "bold", // 文字を太く
            marginLeft: "auto", // 右寄せ
            marginRight: "20px", // 右に余白
            marginBottom: "50px",
            transition: "background-color 0.3s, transform 0.2s"
            }}>
        他のユーザーを招待する
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: 20, backgroundColor: "white", margin: "10% auto", width: 300 }}>
          <h3>ユーザーを招待</h3>
          <TextField
            label="メールアドレス"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button variant="contained" color="primary" onClick={handleInvite} style={{ marginTop: 10 }}>
            送信
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default InviteUser;
