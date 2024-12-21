// Get the variables
const err = document.querySelector(".error");
const inputTask = document.querySelector("#input-task");
const addTaskBtn = document.querySelector("#add-task");
const inputSearch = document.querySelector("#search-input");
const taskList = document.querySelector(".task-list");
const clearAllBtn = document.querySelector(".clear-all");

// STEPS NEEDED FOR THE TASK MANAGER | CRUD OPERATION

// 1. ADD A TASK

//? Click on Add Task before executing the code, so we need an event listener

addTaskBtn.addEventListener("click", function (e) {
  // to clear the default event on the btn
  e.preventDefault();

  //! To clear submission of empty input using a conditional statement
  if (inputTask.value !== "") {
    //! Get our input value and trim it (remove all whitespace)
    const taskText = inputTask.value.trim();

    //! Create a new table row for the tbody
    const newRow = document.createElement("tr");

    //! Create a table data for task column inside the new table row
    const taskCell = document.createElement("td");

    //! Create an input inside the td
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.className = "disabled-task";
    taskInput.value = taskText;
    taskInput.disabled = true;
    taskInput.style.border = "none";
    taskInput.style.backgroundColor = "transparent";
    taskInput.style.width = "100%";

    taskCell.appendChild(taskInput);

    const actionsCell = document.createElement("td");

    //! Append / Put the input field that contains the disabled input task into the new list created (li)
    newRow.appendChild(taskCell);
    newRow.appendChild(actionsCell);

    //! Create  edit btn and give it a class of edit btn
    const editBtn = document.createElement("button");
    editBtn.innerText = " Edit";
    editBtn.className = "btn editBtn";

    //! Add a Font Awesome icon to the edit
    const editIcon = document.createElement("i");
    editIcon.className = "fas fa-edit";
    editIcon.style.float = "left";
    editIcon.style.paddingRight = "5px";

    //! Append the edit icon inside the edit button
    editBtn.appendChild(editIcon);

    //! Append/ Put the edit btn into the new list created (li)
    actionsCell.appendChild(editBtn);
    //! Create  delete btn and give it a class of delete btn, text of delete btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "btn deleteBtn";

    //!Add a Font Awesome icon to the edit
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.style.float = "left";
    deleteIcon.style.paddingRight = "5px";

    deleteBtn.appendChild(deleteIcon);

    //! Append/ Put the delete btn into the new list created (li)
    actionsCell.appendChild(deleteBtn);

    //! put the new list created with information into the task list, which is the UL.
    document.querySelector(".task-list tbody").appendChild(newRow);

    //! clear input after clicking Add task btn
    inputTask.value = "";
  } else {
    err.style.display = "block";
    // after some minutes the error displayed should disappear
    setTimeout(() => {
      err.style.display = "none";
    }, 2000);
  }
});

// Delete the task

//! Onclick on the parent
taskList.addEventListener("click", function (e) {
  e.preventDefault();

  //! Check if the clicked target is a delete button
  if (e.target.classList.contains("deleteBtn")) {
    //! Get the parent of that delete button
    //! Remove the parent
    e.target.parentElement.parentElement.remove();
  }
});

// Edit a task

//! Create an event listener
taskList.addEventListener("click", function (e) {
  e.preventDefault();

  //! Check if the clicked target is edit button
  if (e.target.classList.contains("editBtn"));

  //! Select the input to edit
  const taskCell =
    e.target.parentElement.parentElement.querySelector("td:first-child");

  //! Override the initial disabled input = if input = false
  taskCell.querySelector("input").disabled = false;
  taskCell.querySelector("input").focus();
});

// Delete all tasks
clearAllBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Get the table body (tbody) element within the taskList
  const tbody = taskList.querySelector("tbody");

  // Clear all rows inside the tbody
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
});

// Search for task
//! Add a keyup event listener on the search input field.
// Search for task
inputSearch.addEventListener("keyup", function () {
  const searchText = inputSearch.value.toLowerCase();
  const taskRows = taskList.querySelectorAll("tbody tr");

  taskRows.forEach((row) => {
    const taskText = row
      .querySelector("td:first-child input")
      .value.toLowerCase();

    if (taskText.includes(searchText)) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
});
