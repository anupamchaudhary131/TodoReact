import React from 'react';
import Style from './Item.module.css';
import axios from "axios";


const Item = (props) => {

  const editTodo = async () => {
    const input = prompt('Edit your task', " ")
    if (input === null) {
      return
    }
    if (input === " ") {
      return alert('Please enter a valid todo')
    }
    const origin = window.location.origin
    const response = await axios.put(`${origin}/edit/${props.todo._id}`, {todo: input})
    const data = await response.data
    alert(data.message)
    props.setPrimary((prev) => {
        return prev.map((todo) => {
          if (todo._id === props.todo._id) {
            return {...todo, title: input}
          }
          return todo
        })
      }
    )

  }

  const deleteTodo = async (id) => {
    const origin = window.location.origin
    const response = await axios.delete(`${origin}/delete/${id}`)
    const data = await response.data
    alert(data.message)
    props.setPrimary((prev) => {
      return prev.filter((todo) => {
        return todo._id !== id
      })
    })


  }


  const changeStatus = async (id, status) => {
    const origin = window.location.origin
    const response = await axios.put(`${origin}/set/${id}`, {completed: status})
    const data = await response.data
    if (status) {
      props.setPrimary(data.todos)
      props.setSecondary(data.completedTodos)
    }
    else {
      props.setPrimary(data.completedTodos)
      props.setSecondary(data.todos)
    }

  }



return (
  <div className={Style.item}>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <input
        onChange={(e) => {
          changeStatus(props.todo._id, e.target.checked)
        }}
        type="checkbox" id="item" name="item" value="item" checked={props.todo.completed}
      />
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <label htmlFor="item">{props.todo.title}</label>
        <span style={{color: "#a2a2a2", fontSize: '0.6rem'}}>{(new Date(props.todo.created_at)).toDateString()}</span>
      </div>
    </div>
    <div>
      <button
        onClick={editTodo}
        className={Style.button}>Edit
      </button>
      <button
        onClick={() => deleteTodo(props.todo._id)}
        className={Style.button}>
        Delete
      </button>
    </div>

  </div>
);
}


export default Item;
