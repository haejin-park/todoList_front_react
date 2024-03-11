import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import api from "../utils/api";
import TodoBoard from "../components/TodoBoard";
const TodoPage = ({setUser}) => {
  
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');
  const getTasks = async() => {
    try {
      const response = await api.get('/tasks');
      if(response.status !== 200) throw new Error('할 일을 조회할 수 없습니다.');
      setTodoList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async() => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue, 
        isComplete: false
      });
      if(response.status !== 200)throw new Error('할 일을 추가할 수 없습니다.');
      setTodoValue('');
      getTasks();
    } catch (error) {
      console.error(error);
    }
  }


  const updateTaskComplete = async(id) => {
    const response = await api.put(`/tasks/${id}`);
    try {
      if(response.status !== 200) throw new Error('할 일 완성여부를 수정할 수 없습니다.');
      getTasks();
    } catch(error) {
      console.error(error);
    }
  }

  const deleteTask = async(id) => {
    const response = await api.delete(`/tasks/${id}`);
    try {
      if(response.status !== 200) throw new Error('할 일을 삭제할 수 없습니다.');
      getTasks();
    } catch(error) {
      console.error(error);
    }
  }
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
  } 

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={12}>  
        <div className="logout" onClick={handleLogout}>logout</div>
        </Col>
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e)=>setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>
      <TodoBoard todoList={todoList} updateTaskComplete={updateTaskComplete} deleteTask={deleteTask} />
    </Container>
  );
}

export default TodoPage

