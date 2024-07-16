import React from 'react';
import Navbar from './Components/Navbar';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [Showchekedtodo, setShowchekedtodo] = useState(false);

  useEffect(() => {
    let stringTodo = localStorage.getItem("Todos");
    if (stringTodo !== null) {
      let Todos = JSON.parse(stringTodo);
      setTodos(Todos);
    }
  }, []);

  const savelocalST = (todos) => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  };

  const handlesubmit = (e) => {
    const newTodos = [...Todos, { id: uuidv4(), Todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    savelocalST(newTodos);
    toast.success('Todo added successfully!');
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item => item.id === id);
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savelocalST(newTodos);
  };

  const handleEdit = (e, id) => {
    let t = Todos.filter(item => {
      return item.id === id;
    });
    let newTodos = Todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    setTodo(t[0].Todo);
    savelocalST(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = Todos.filter(item => item.id !== id);
    setTodos(newTodos);
    savelocalST(newTodos);
    toast.error('Todo deleted successfully!');
  };

  const handlechange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <Navbar />
      <div className="container mx-auto md:w-9/12 w-11/12 rounded-2xl bg-customColor">
        <div className="rounded container p-1 mt-2">
          <h2 className='mx-3'>Add a todo</h2>
          <input type="text" id='Input' onChange={handlechange} value={Todo} className='w-2/3 rounded-lg mx-5 my-2 p-1' placeholder='Enter Your Note' />
          <button disabled={Todo.length < 3} className='bg-green-500 p-1 rounded-md hover:font-medium transition-all duration-200 disabled' onClick={handlesubmit}>submit</button>
        </div>
        <h2 className='mx-3 font-extrabold'>Your Todos</h2>
        <input type="checkbox" name="" checked={Showchekedtodo} className="mx-3 check" id="" /><span>Show only marked todos</span>
        <div className="yourtodos w-full md:w-9/12">
          <div className="nolinetrough text-sm m-3 overflow-y-auto"></div>
          {Todos.length >= 0 && <div className='text-sm m-3'>No Todos for Display</div>}
          {Todos.map(item => {
            return (!Showchekedtodo || item.isCompleted) && <div className="flex justify-between m-4 items-center" key={item.id}>
              <input type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} name={item.id} id="" />
              <div className={`p-4 overflow-auto ${item.isCompleted ? "line-through" : ""}`}>{item.Todo}</div>
              <div className="buttons gap-6 flex">
                <button className='bg-white p-1.5 rounded-md' onClick={(e) => handleEdit(e, item.id)}><CiEdit /></button>
                <button className='bg-white p-1.5 rounded-md' onClick={(e) => handleDelete(e, item.id)}><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
