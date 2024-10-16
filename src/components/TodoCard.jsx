import React from "react";

const TodoCard = ({ todo, onStatusChange, onDelete }) => {
  const { name, date, status } = todo;
 

  return (
    <div className="p-4 bg-gradient-to-r from-green-200 to-green-400 rounded-lg shadow-lg flex flex-col justify-between transition transform hover:scale-105 hover:shadow-2xl">
   
      <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {name}
      </h2>

     
      <p className="text-gray-600 text-sm mt-2">
        <span className="font-semibold">Date:</span> {new Date(date).toLocaleDateString()}
      </p>

      
      <p className={`mt-2 text-sm font-semibold ${status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
        <span>Status: </span>
        {status}
      </p>

      <div className="flex space-x-2 mt-4">
       
        <button
          onClick={onDelete}
          className="text-white bg-red-500 px-3 py-1 rounded-full hover:bg-red-600 transition"
        >
          Delete
        </button>

    
        {status === "Pending" && (
          <button
            onClick={onStatusChange}
            className="text-white bg-blue-500 px-3 py-1 rounded-full hover:bg-blue-600 transition"
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
