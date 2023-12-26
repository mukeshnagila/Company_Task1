import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Components/todo.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { FcOk, FcDownLeft } from "react-icons/fc";

const Todo = () => {
  const [tododata, settododata] = useState([]);
  const [newTodoTask, setnewTodoTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    // Fetch todos from the API
    axios.get('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(response => settododata(response.data));
  }, []);


  // for adding any new task
  const HandelAddTask = () => {
    if (newTodoTask.trim() !== '') {
      const newTodo = {
        userId: 1,
        id: tododata.length + 1, // Use a unique ID for new todos
        title: newTodoTask,
        completed: false,
      };

      settododata([...tododata, newTodo]);
      setnewTodoTask('');
    } else {
        // Display a prompt or alert when the input is empty
        alert('Please fill the input box');
    }
  };

  //for check task is complete or undo
  const toggleTaskStatus = (id) => {
    const updatedTodos = tododata.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    settododata(updatedTodos);
  };

  //for edit the task which is already added
  const HandelEditTask = (id, newTitle) => {
    if (newTitle !== null && newTitle.trim() !== '') {
        const updatedTodos = tododata.map(todo =>
          todo.id === id ? { ...todo, title: newTitle } : todo
        );
        settododata(updatedTodos);
    } else if (newTitle !== null) {
        // Display a prompt or alert when the edited task is empty
        alert('Please fill the input box');
    }
  };

  //for deleteing any task
  const HandelDeleteTask = (id) => {
    const updatedTodos = tododata.filter(todo => todo.id !== id);
    settododata(updatedTodos);
  };

  const filteredTodos = showCompleted ? tododata.filter(todo => todo.completed) : tododata;

  return (
    <div className='maincontainer'>
            <div className='forInput'>
                <input
                    className='input1'
                    type="text"
                    value={newTodoTask}
                    onChange={(e) => setnewTodoTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button className="addtaskbtn" onClick={HandelAddTask}>Add Task</button>
            </div>
            <div className='forInput2'>
                <label>Show Completed Task</label>
                <input
                className='input2'
                type="checkbox"
                checked={showCompleted}
                onChange={() => setShowCompleted(!showCompleted)}
                />
            </div><hr/>

            <ul>
                {filteredTodos.map(todo => (<>
                <li key={todo.id}>
                    <div className='underdiv1'>
                        <span
                        // style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                        className={todo.completed ? 'uncomtext' : 'completetext'}
                        onClick={() => toggleTaskStatus(todo.id)}
                        >
                        {todo.title}
                        </span>
                    </div>    
                    
                    <div className='underdiv2'>   
                        { !todo.completed &&
                        <div className='Btn editbtn' onClick={() => HandelEditTask(todo.id, prompt('Edit task:', todo.title))}>
                            <FaRegEdit style={{ fontSize: '24px', color: 'royalblue' }}/>
                        </div>
                        }
                        <div className='Btn deletebtn' onClick={() => HandelDeleteTask(todo.id)}>< RiDeleteBin5Line style={{ fontSize: '24px', color: '#f12929'  }}/></div>
                        <div className={`Btn ${todo.completed ? <FcDownLeft style={{ fontSize: '24px' }}/> : <FcOk style={{ fontSize: '24px' }}/>}`} onClick={() => toggleTaskStatus(todo.id)}>
                        {todo.completed ? <FcDownLeft style={{ fontSize: '24px' }}/> : <FcOk style={{ fontSize: '24px' }}/>}
                        </div>
                    </div>
                </li><hr/>
                </>
                ))}
            </ul>
    </div>
  );
};

export default Todo;
