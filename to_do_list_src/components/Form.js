import React from 'react'
import { useState } from 'react'

const Form = (
    {inputText, setInputText, todos, setTodos, setStatus, delet, filteredTodos, date, setDate}
    ) => {
    
    const [alertWarning, setAlertWarning] = useState(false)
    const [alertSuccess, setAlertSuccess] = useState(false)
    
    const inputTextHandler =(e) =>{
        setInputText(e.target.value)
    }
    const dateHandler =(e) =>{
        setDate(e.target.value)
    }

    const submitTodoHandler = (e)=>{
        e.preventDefault()
        const isEmpty = str => !str.trim().length
        if(isEmpty(inputText)){
            setAlertWarning(true)
            setTimeout(() => {
                setAlertWarning(false)
            }, 1000);
        }else {
            setAlertSuccess(true)
            setTimeout(() => {
                setAlertSuccess(false)
            }, 1000);
            setTodos([
                ...todos,
                {text: inputText, date: date, completed: false, id: Math.random()}
            ])
            setInputText('')
            setDate('')
        }
    }

    const statusHandler = (e) => {
        setStatus(e.target.value)
    }

  return (
    <form>
        <div className='search'>
            <input
            type='text' className='todo-input' value={inputText} placeholder='Add..'
            onChange={inputTextHandler}/>
            <input
            type='date' className='todo-input' value={date} onChange={dateHandler} />
            <button className='todo-button' type='submit' onClick={submitTodoHandler}>
                <i className='fas fa-plus-circle'></i>
            </button>
        </div>
        <div className='select'>
            <select name='todos' className='filter-todo' onChange={statusHandler}>
                <option value='all' >All</option>
                <option value='completed' >Completed</option>
                <option value='uncompleted' >Uncompleted</option>
            </select>
        </div>
        <div className='alert-wrapper'>
            {alertWarning ? (
            <div className='alert-warning'>
                <div>Please Type Something</div>
             </div>
            )
            : null}
            {alertSuccess ?
            (<div className='alert-success'>
                <div>Successful Entry</div>
            </div>)
            : null}
           {delet ? (
            <div className='alert-warning'>
                <div>Item Deleted</div>
            </div>
            )
            : null
            }
            {/* {filteredTodos.map((todo)=> (
                setTimeout(() => {
                    todo.completed ?
                    (<div className='alert-success'>
                    <div>Successfully completed</div>
                    </div>)
                    :
                    ( <div className='alert-warning'>
                        <div>Uncompleted</div>
                        </div>)
                }, 1000)
            ))} */}
        </div>
    </form>
  )
}

export default Form;

