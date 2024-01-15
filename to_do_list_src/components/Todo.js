import React from 'react'


const Todo = ({text, todos, setTodos,todo, setDelet, date}) => {

    
    const deleteHandler =() =>{
        setTodos(todos.filter((i) => i.id !== todo.id))
        setDelet(true)
        setTimeout(() => {
            setDelet(false)
        }, 1000);
    }

    const completeHandler =() => {
        setTodos(todos.map((i) => {
            if(i.id === todo.id){
                return {
                    ...i, completed : !i.completed
                }
            }
            return i
        }))
    }
    const formatDate=(time) =>{
        if(!time.length){
            return null
        }else{
            time=String(time).split("-")
            var m =time[1]
            let month=''
            if(m==="01"){month= 'OCAK'}
            else if(m==="02"){month= 'ŞUBAT'}
            else if(m==="03"){month= 'MART'}
            else if(m==="04"){month= 'NİSAN'}
            else if(m==="05"){month= 'MAYIS'}
            else if(m==="06"){month= 'HAZİRAN'}
            else if(m==="07"){month= 'TEMMUZ'}
            else if(m==="08"){month= 'AĞUSTOS'}
            else if(m==="09"){month= 'EYLÜL'}
            else if(m==="10"){month= 'EKİM '}
            else if(m==="11"){month= 'KASIM'}
            else if(m==="12"){month= 'ARALIK'}
            return ` ${time[2]} ${month} ${time[0]}`
        }
      }
  return (
    <div className= {`todo ${todo.completed ? 'completed' : null}`}>
        <button className='complete-btn' onClick={completeHandler}>
            <i className='fas fa-check-circle'></i>
        </button>
        <li className='todo-item'>
            {text}<br></br>{formatDate(date)}
        </li>
        <button className='trash-btn' onClick={deleteHandler}>
            <i className='fa fa-minus-circle'></i>
        </button>
    </div>
  )
}

export default Todo