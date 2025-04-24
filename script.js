// GRABBING THE ELEMENTS
const inputField = document.querySelector("input");
const button = document.querySelector("button");
const parentDiv = document.querySelector(".parent-div");
const deleteButton = document.getElementById("deleteButton");
const todoContainer = document.querySelector(".to-do-container");

// ARRAY TO STORE TO-DO IN LOCAL STORAGE
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// LOADING CONTENT OF THE LOCAL STORAGE INTO THE PAGE.
window.onload = () => {
  tasks.forEach((task, index) => {
    const todoList = document.createElement("div");
    todoList.className = "to-do-container";
    todoList.innerHTML = `
    <input class="checkBox" type="checkbox" ${
      task.isCompleted ? "checked" : ""
    } />
    <h3 class="todo-heading">${task.text}</h3>
        <button class="edit-button">Edit</button>
    <button class="delete-button">Delete</button> `;

    parentDiv.appendChild(todoList);

    if (task.isCompleted) {
      todoList.querySelector(".todo-heading").classList.add("crossed");
    }
  });
};
// FUNCTION TO STORE TO DO IN LOCAL STORAGE.

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// FUNCTION TO ADD TO DO DYNAMICALLY

function createTask(inputField) {
  const todoList = document.createElement("div");
  todoList.className = "to-do-container";
  todoList.innerHTML = `
  <input class="checkBox" type="checkbox" ${
    tasks.isCompleted ? "checked" : ""
  } />
  <h3 class="todo-heading">${inputField.value}</h3>
      <button class="edit-button">Edit</button>
  <button class="delete-button">Delete</button> `;
  parentDiv.appendChild(todoList);
  inputField.value = "";
}

// ADDING TO DO LIST DYNAMICALLY
button.addEventListener("click", () => {
  // when input value is empty
  if (inputField.value.trim() == "") {
    window.alert("Enter Your TO-DO");
    return;
  }

  const task = {
    text: inputField.value,
    isCompleted: false,
  };

  tasks.push(task);

  saveTasks();

  createTask(inputField);
});
// ADDING TO DO LIST DYNAMICALLY WORKING FOR ENTER BUTTON

inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    // when input value is empty
    if (inputField.value.trim() == "") {
      window.alert("ENTER YOUR TO-DO");
      return;
    }
    const task = {
      text: inputField.value,
      isCompleted: false,
    };
    tasks.push(task);
    saveTasks();

    createTask(inputField);
    saveTasks();
  }
});

// DELETING TO-DO
parentDiv.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    const todoItem = event.target.closest(".to-do-container");
    if (todoItem) {
      // Array .from converts array and index of gives index of delete element
      const index = Array.from(parentDiv.children).indexOf(todoItem);
      // splice() function actually deletes the element from the tasks array in local storage.
      tasks.splice(index, 1);
      todoItem.remove();
      saveTasks();
    }
  }
});

// LISTNER EVENT TO EDIT TO DO
parentDiv.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-button")) {
    const editButton = event.target;

    // if text content is edit

    if (editButton.textContent === "Edit") {
      const todoText = event.target.previousElementSibling;
      const currentText = todoText.textContent;
      let newInputElement = document.createElement("input");
      newInputElement.value = currentText;
      todoText.replaceWith(newInputElement);
      editButton.textContent = "Save";
      newInputElement.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
          const updatedToDoText = document.createElement("h3");
          updatedToDoText.textContent = newInputElement.value;
          newInputElement.replaceWith(updatedToDoText);
          editButton.textContent = "Edit";
        }
      });
    } else if (editButton.textContent === "Save") {
      const inputElement = event.target.previousElementSibling;
      const updatedToDoText = document.createElement("h3");
      updatedToDoText.className = "todo-heading";
      updatedToDoText.textContent = inputElement.value;

      // Get the index of the task being edited
      const todoItem = event.target.closest(".to-do-container");
      const index = Array.from(parentDiv.children).indexOf(todoItem);

      //  Update the task in the array
      tasks[index].text = inputElement.value;
      saveTasks();

      inputElement.replaceWith(updatedToDoText);
      editButton.textContent = "Edit";
    }
  }
});

// CHECK BOX FUNCTIONALITY

parentDiv.addEventListener("change", (event) => {
  if (event.target.tagName == "INPUT") {
    let todoText = event.target.nextElementSibling;
    let taskIndex = Array.from(
      event.target.closest(".parent-div").children
    ).indexOf(event.target.closest(".to-do-container"));

    tasks[taskIndex].isCompleted = event.target.checked;
    saveTasks();
    if (event.target.checked) {
      todoText.classList.add("crossed");
    } else {
      todoText.classList.remove("crossed");
    }
  }
});
