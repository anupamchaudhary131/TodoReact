import React from 'react';
import Style from './AddBar.module.css';
import axios from "axios";


const AddBar = (props) => {
  const [todo, setTodo] = React.useState('')
  const addTodo = async () => {
    if (todo === '') {
      return alert('Please enter a valid todo')
    }
    const origin = window.location.origin
    const response = await axios.post(`${origin}/add`, {todo: todo})
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
