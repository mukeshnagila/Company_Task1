import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Components/todo.css";

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
    if (newTitle.trim() !== '') {
        const updatedTodos = tododata.map(todo =>
          todo.id === id ? { ...todo, title: newTitle } : todo
        );
        settododata(updatedTodos);
    } else {
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
                        <button className='Btn editbtn' onClick={() => HandelEditTask(todo.id, prompt('Edit task:', todo.title))}>
                            Edit
                        </button>
                        }
                        <button className='Btn deletebtn' onClick={() => HandelDeleteTask(todo.id)}>Delete</button>
                        <button className={`Btn ${todo.completed ? 'undobtn' : 'completebtn'}`} onClick={() => toggleTaskStatus(todo.id)}>
                        {todo.completed ? 'Undo' : 'Complete'}
                        </button>
                    </div>
                </li><hr/>
                </>
                ))}
            </ul>
    </div>
  );
};

export default Todo;
