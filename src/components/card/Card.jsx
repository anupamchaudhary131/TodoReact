import Style from './Card.module.css';
import React from 'react';
import AddBar from "../addbar/AddBar.jsx";
import Item from "../item/Item.jsx";
import axios from 'axios'

const getTodos = async (setTodos, setCompleted) => {
  const response = await axios.get('http://192.168.1.15:3000/todos')
  const data = await response.data
  console.log(data)
  setTodos(data.todos)
  setCompleted(data.completedTodos)
}

const Card = () => {
  const [todos, setTodos] = React.useState([])
  const [completed, setCompleted] = React.useState([])
  React.useEffect(() => {
    getTodos(setTodos, setCompleted)
  }, []);
  return (
    <div className={Style.card}>
      <AddBar setTodos={setTodos}/>
      <hr style={{width: "100%", color: "#f1f1f1"}}/>
      <div className={Style.cardBody}>
        <div className={Style.container}>
          <h1 style={{marginBottom: "1rem"}}>To do</h1>
          {todos && todos.map((todo, index) => {
              return <Item key={index} todo={todo} setPrimary={setTodos} setSecondary={setCompleted}/>
            }
          )}
        </div>
        <div className={Style.container}>
          <h1 style={{marginBottom: "1rem"}}>Completed</h1>
          {completed && completed.map((todo, index) => {
              return <Item key={index} todo={todo} setPrimary={setCompleted} setSecondary={setTodos}/>
            }
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
