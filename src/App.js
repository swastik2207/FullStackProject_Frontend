import React, { useState,useEffect } from "react";
import TodoCard from "./components/TodoCard";
import axios from "axios";
import toast from "react-hot-toast";
const App = () => {

  const [todos,setTodos]=useState([])
  const [newtodo, setTodo] = useState(
    {
      name: "",
      date: "",
      status: "Pending"
    }
    
  )
  ;

  useEffect(() => {

    const getAllTasks = async()=>{

    try{
      const getAllTodos= await axios.get("http://localhost:5000/api/task/getalltasks")
 
       setTodos(
        getAllTodos.data
       )
       console.log(getAllTodos)
    
      }
      catch(err){

        toast.error("Failed to fetch AllTasks")
      }
    }
    getAllTasks();
    return () => {
      console.log("Cleanup on unmount or before next effect");
    };
  }, []);


  const handleDelete=async(id)=>{
     
    try{
       await axios.delete(`http://localhost:5000/api/task/deletetask/${id}`)

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      toast.success("Task deleted successfully")

    }

    catch(e){

      toast.error(e.message)
    }

  }

const handleChange=async(e)=>{
  e.preventDefault();
  
    
  setTodo((prevData)=>({
       ...prevData,
       [e.target.name]:e.target.value

  }));


}

  const addTodo = async(e) => {
  
     e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/task/create", newtodo);
      console.log('Task created successfully:', response.data);
      toast.success("Task Created Successfully")
      
    } catch (error) {
      console.error('Error creating task:', error.response ? error.response.data : error.message);
      toast.error("Something went wrong")
  
    }
  
     
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Todo App</h1>

       
        <form onSubmit={(e)=>{addTodo(e)}} className="space-y-4 mb-4">
          <input
            type="text"
            placeholder="Todo Name"
            value={newtodo.name}
            name="name"
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newtodo.date}
            name="date"
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newtodo.status}
            onChange={(e) => handleChange(e)}
            name="status"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            type="submit"
            className="w-full  px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Todo
          </button>
        </form>

        <div className="space-y-4">
        {Array.isArray(todos) && todos.length > 0 ? (
            todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} onDelete={()=>handleDelete(todo.id)} />
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
