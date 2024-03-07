import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({todo, updateTaskComplete, deleteTask}) => {

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${todo.isComplete? "item-complete": ""}`}>
          <div className="todo-content">{todo.task}</div>
          <div>by {todo.author.name}</div>
          <div>
            <button className="button-delete" onClick={() => deleteTask(todo._id)}>삭제</button>
            <button className="button-delete" onClick={() => updateTaskComplete(todo._id)}>{todo.isComplete? '완료': '미완료'}</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
