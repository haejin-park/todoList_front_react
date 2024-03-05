import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./App.css";
import TodoBoard from "./components/TodoBoard";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const getTasks = async() => {
    try {
      const response = await api.get('/tasks');
      // console.log('getTasks response', response);
      if(response.status === 200) {
        console.log('성공');
        setTodoList(response.data.data);
      } else {
        throw new Error('할 일을 조회할 수 없습니다.');
      }
    } catch (err) {
      console.error('err', err);
    }
  };

  const addTask = async() => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue, 
        isComplete: false
      });
      // console.log('addTasks response', response);
      if(response.status === 200){
        console.log('성공');
        setTodoValue('');
        getTasks();
      } else {
        throw new Error('할 일을 추가할 수 없습니다.');
      }
    } catch (err) {
      console.error('err', err);
    }
  }


  const updateTaskComplete = async(id) => {
    const response = await api.put(`/tasks/${id}`);
    // console.log('updateTaskComplete response', response);
    try {
      if(response.status === 200) {
        getTasks();
      } else {
        throw new Error('할 일 완성여부를 수정할 수 없습니다.');
      }
    } catch(err) {
      console.error(err);
    }
  }

  const deleteTask = async(id) => {
    const response = await api.delete(`/tasks/${id}`);
    // console.log('deleteTask response', response);
    try {
      if(response.status === 200) {
        getTasks();
      } else {
        throw new Error('할 일을 삭제할 수 없습니다.');
      }
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <Container>
      <Row className="add-item-row">
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

export default App;
