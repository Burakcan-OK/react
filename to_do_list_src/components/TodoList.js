import React from 'react'
import Todo from './Todo'
const TodoList = ({todos, setTodos, filteredTodos, setDelet}) => {
  return (
    <div className='todo-container'>
        <ul className='todo-list'>
            {filteredTodos.map((todo) => (
                <Todo
                    todo={todo}
                    text={todo.text}
                    date={todo.date}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                    setDelet={setDelet}
                />
            ))}
        </ul>
    </div>
  )
}

export default TodoList