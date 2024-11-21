import react, { useState} from "react";
import "./todo.css";

function Todo() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [editedValue, setEditedValue] = useState("");

  //handle check box
  const handleCheckBox = (key) => {
    let status = document.getElementById(`checkBox${key}`);
    if (status.checked) {
      let element = document.getElementsByTagName("li");
      element[key].style.textDecoration = "line-through";
    } else {
      let element = document.getElementsByTagName("li");
      element[key].style.textDecoration = "none";
    }
  };

  //Handle main input value
  const handleMainInputValue = (event) => {
    setValue(event.target.value);
  };

  //add new task to array
  const addNewTask = () => {
    const newElement = document.createElement("h6");

    //handle task's name which is duplicate
    if (tasks.includes(value.trim())) {
      let errorElement = document.getElementsByTagName("h6");
      if (errorElement.length > 0) {
        errorElement[0].remove();
      }
      const newContent = document.createTextNode(
        "This item is already present."
      );
      newElement.appendChild(newContent);
      document.getElementById("forError").appendChild(newElement);
    }
    //To handle the emty contents
    else if (value.trim().length == 0) {
      let errorElement = document.getElementsByTagName("h6");
      if (errorElement.length > 0) {
        errorElement[0].remove();
      }
      const emtyContent = document.createTextNode(
        "The text field must contain at least one character"
      );
      newElement.appendChild(emtyContent);
      document.getElementById("forError").appendChild(newElement);
    }
    //handle all task's names to be added
    else {
      let errorElement = document.getElementsByTagName("h6");
      if (errorElement.length > 0) {
        errorElement[0].remove();
      }
      setTasks((old) => [...old, value.trim()]);
      setValue("");
    }
  };

  //handle delete button to be deleted
  const toRemove = (key) => {
    let statusOfCheckBox = document.getElementById(`checkBox${key}`);
    if (statusOfCheckBox.checked) {
      statusOfCheckBox.checked = false;
      document.getElementsByTagName("li")[key].style.textDecoration = "none";
    }
    setTasks(
      tasks.filter((val, index) => {
        return index !== key;
      })
    );
  };

  //change the status of input status value
  const changeStatus = (index) => {
    setEditStatus(index);
  };

  //handle edit input
  const handleEditinput = (event) => {
    setEditedValue(event.target.value);
  };

  // submit the edited value to the position
  const loadEditedValue = (index) => {
    setTasks(
      tasks.map((val, key) => {
        return index !== key ? val : editedValue;
      })
    );
    setEditStatus(false);
  };

  const reset = ()=>{
    setTasks([])
  }

  return (
    <div className="todo-container">
      <h4>Todo App</h4>
      <div id="forError"></div>

      <form
        className="input-section"
        onSubmit={(event) => {
          event.preventDefault();
          addNewTask();
        }}
      >
        <input
          type="text"
          value={value}
          placeholder="Enter Task..."
          onChange={handleMainInputValue}
        />
      </form>
      <ul>
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              <span>
                <input
                  type="checkbox"
                  id={`checkBox${index}`}
                  onChange={() => handleCheckBox(index)}
                />
              </span>
              {index !== editStatus ? (
                <span>{task}</span>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    loadEditedValue(index);
                  }}
                >
                  <input value={editedValue} onChange={handleEditinput} />
                </form>
              )}
              <i
                className="fa-solid fa-trash"
                onClick={() => toRemove(index)}
              ></i>
              <button
                onClick={() => {
                  changeStatus(index);
                }}
              >
                Edit
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={reset}>reset</button>
    </div>
  );
}

export default Todo;
