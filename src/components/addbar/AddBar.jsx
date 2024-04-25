import React from 'react';
import Style from './AddBar.module.css';
import axios from "axios";


const AddBar = (props) => {
  const [todo, setTodo] = React.useState('')
  const addTodo = async () => {
    const response = await axios.post('http://192.168.1.15:3000/add', {todo: todo})
    alert(response.data.message)
    setTodo('')
    props.setTodos((prev) => {
      return [...prev, response.data.todo]
    })
  }
  return (
    <div className={Style.addbar}>
      <input type="text" placeholder="Add a new task" value={todo} onChange={(e) => setTodo(e.target.value)}/>
      <button onClick={addTodo}>+</button>
    </div>
  );

};

export default AddBar;
