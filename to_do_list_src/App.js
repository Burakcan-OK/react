import Form from './components/Form';
import './App.css';
import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

function App() {

  const [inputText, setInputText] = useState("")
  const [date, setDate] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])
  const [delet, setDelet] = useState(false)

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }


  //! save to local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getLocalTodos = () => {
     if (localStorage.getItem("todos") === null) {
       localStorage.setItem("todos", JSON.stringify([]))
     } else {
       setTodos(JSON.parse(localStorage.getItem("todos")))
     }
  }

  useEffect(() => {
    getLocalTodos();
  }, []) //eslint-disable-line

  useEffect(() => {
    filterHandler(todos);
    saveLocalTodos();
  }, [todos, status]) //eslint-disable-line

  return (
    <div className="App">
      <header>
        <h1>MY TO-DO LIST</h1>
        <Form
          inputText={inputText}
          setInputText={setInputText}
          todos={todos}
          setTodos={setTodos}
          setStatus= {setStatus}
          delet={delet}
          filteredTodos= {filteredTodos}
          date={date}
          setDate={setDate}
          
        />
        <TodoList 
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
        setDelet={setDelet}
        />
      </header>
    </div>
  );
}

export default App;
