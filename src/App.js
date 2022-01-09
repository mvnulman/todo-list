import "./App.css";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)


let genId = 1;

function App() {
  const [itemsList, setItemsList] = useState([]);
  const [inputText, setInputText] = useState("");

  const newTask = {
    id: genId++,
    text: inputText.trim(),
    isCompleted: false,
  };

  function handleChangeInput(event) {
    setInputText(event.target.value);
  }

  function handleAddItemToList(event) {
    event.preventDefault();

    if (newTask.text.length === 0) {
      // alert("Please, fill the form with your task");
      Swal.fire({
        icon: 'error',
        title: 'Oops... ',
        text: 'Please, add one task first!',
      })
    } else {
      // add task to the end of the list
      setItemsList([...itemsList, newTask]);

      // clear input after submit
      setInputText("");
    }
  }

  
  function handleTaskDone(item) {
    console.log("Done!")
    const doneItems = itemsList.map(task => {
      if (task.id === item.id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;  
    });
    setItemsList(doneItems);
  }
  


  function handleDeleteTask(item) {
    const filteredItems = itemsList.filter(task=>task.id !== item.id);
    setItemsList(filteredItems);
  }


  function handleClearAllTasks() {
    if (itemsList.length > 0) {
      setItemsList("");
    }
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleAddItemToList}>
        <input type="text" onChange={handleChangeInput} value={inputText} placeholder="Add your new todo..."/>
        <button className="button-add" type="submit">+</button>
      </form>

      {!itemsList.length ? (
        <p>The list is empty! Let's add some tasks :) </p>
      ) : (
        itemsList.map((item, id) => (
          <div key={id} className="task-list" style={{textDecoration: item.isCompleted ? "line-through" : null}}>
            {item.text}
            <div>
              <MdDone className="button-done" onClick={()=>{handleTaskDone(item)}} />
              <BsTrash className="button-x" onClick={()=>{handleDeleteTask(item)}} />
            </div>
          </div>
        ))
      )}
      {!itemsList.length ? null : (
        <div >
          <button className="clear-button" onClick={handleClearAllTasks}>Clear All</button>
        </div>
      )}
    </div>
  );
}

export default App;
