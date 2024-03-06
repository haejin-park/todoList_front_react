import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from 'react-router-dom'
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from "./route/PrivateRoute";
import { useState } from "react";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get("/user/me");
    } catch(error) {
      console.error(error);
    }
  }
  return (
    <Routes>
        <Route 
          path="/" 
          element={
            <PrivateRoute user={user}>
              <TodoPage/>
            </PrivateRoute>
          }
        />
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  )
}

export default App
