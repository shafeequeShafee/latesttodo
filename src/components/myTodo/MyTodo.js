import React, { useState,useEffect } from 'react'

function MyTodo() {
  // ethil eppo local storagil value indekil ath todos llekku return cheyunnu
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    console.log("savedTodos", savedTodos)
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  //console.log("todos",todos)



  const [todo, setTodo] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([...todos, { id: todos.length, text: todo.trim() }])
    }
    setTodo("")

  }
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  }

  // object state to set so we know which todo item we are editing
  const [currentTodo, setCurrentTodo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = (todo) => {
    // set editing to true
    setIsEditing(true);
    // set the currentTodo to the todo item that was clicked
    setCurrentTodo({ ...todo });

  }

  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }
  //////////////////////////////////////////////////////////////////////
  const handleUpdateTodo =(id, updatedTodo)=>{
   
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);

    setTodos(updatedItem);
  }


  const handleEditFormSubmit =(e)=>{
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);

  }
  
  
//   const o1 = {a: "original a", b: "original b"};
// // Doesn't work:
// const o2 = {a: "updated a", ...o1};
// console.log(o2);
// // Works:
  const handleEditInputChange =(e)=>{
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }
 
////////////////////////////////////////////////////////////////
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);


  return (
    <div>
      {
        isEditing ? (
          <form onSubmit={(e)=>handleEditFormSubmit(e)}>

          <h2>Edit Todo</h2>
          <label htmlFor="editTodo">Edit todo: </label>
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={(e)=>handleEditInputChange(e)}
          />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
        ) :
          (
            <form onSubmit={(e) => handleFormSubmit(e)}>
             
              <h2>Add Todo</h2>
             
              <label htmlFor="todo">Add todo: </label>
              <input
                name="todo"
                type="text"
                placeholder="Create a new todo"
                value={todo}
                onChange={(e) => handleInputChange(e)}
              />
              <button type="submit">Add</button>
            </form>
          )

      }

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditClick(todo)}>Edit</button>
            <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default MyTodo