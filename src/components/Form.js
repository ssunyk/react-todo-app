import React, {useEffect} from 'react'
import {v4 as uuidv4} from "uuid";

const Form = ({input, setInput, todos, setTodos, editTodo, setEditTodo}) => {
  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) => 
      todo.id === id ? {title, id, completed} : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };
  useEffect(() => {
    if(editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if(!editTodo) {
      setTodos([
        ...todos, {title: input, completed: false, id: uuidv4()}
      ]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed)
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input 
        type="text" 
        className="task-input" 
        placeholder="Add new todo" 
        value={input} 
        onChange={onInputChange} 
        required
      />
      <button type="submit" className="button-add" onClick={onFormSubmit}>
        {editTodo ? "OK" : "Add"}
      </button>
      {/* <div className="select">
        <select name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div> */}
    </form>
  )
}

export default Form