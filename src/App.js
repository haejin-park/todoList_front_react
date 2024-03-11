import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from 'react-router-dom'
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from "./route/PrivateRoute";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if(storedToken) {
        const response = await api.get("/user/me");
        if(response.status !== 200) throw new Error(response.message);
        setUser(response.data.user);
      }
    } catch(error) {
      console.error(error);
      sessionStorage.removeItem("token");
      setUser(null)
    }
  }
  useEffect(() => {
    getUser();
  }, [])
  return (
    <Routes>
        <Route 
          path="/" 
          element={
            <PrivateRoute user={user}>
              <TodoPage setUser={setUser}/>
            </PrivateRoute>
          }
        />
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>}/>
    </Routes>
  )
}

export default App
