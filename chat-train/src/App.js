
import './App.css';
import SignIn from './components/SignIn';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase.js"
import Line from './components/Line.js';
import Rooms from './components/Rooms.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user] = useAuthState(auth);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Rooms /> : <SignIn />} />
        <Route path="/room/:roomId" element={user ? <Line /> : <SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
