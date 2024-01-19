let addBtn = document.getElementById("addButton");
let taskInput = document.getElementById("taskInput");
let dateOfTask = document.getElementById("date");
let list = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);
window.addEventListener("load", loadTasks);
function addTask() {
  let taskText = taskInput.value.trim();
  let dateText = dateOfTask.value.trim();

  if (taskText !== "") {
    let listItem = document.createElement("li");
    let taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    let dateSpan = document.createElement("span");
    dateSpan.textContent = dateText;
    taskInfo.appendChild(taskSpan);
    taskInfo.appendChild(dateSpan);
    let removeButton = document.createElement("button");
    removeButton.textContent = "Completed";
    listItem.appendChild(removeButton);
    removeButton.addEventListener("click", function () {
      list.removeChild(listItem);
      saveTasks();
    });
    listItem.appendChild(taskInfo);
    listItem.appendChild(removeButton);
    list.appendChild(listItem);
    taskInput.value = "";
    dateOfTask.value = "";

    saveTasks();
  }
}

function saveTasks() {
  let tasks = [];
  for (let i = 0; i < list.children.length; i++) {
    let taskItem = list.children[i].querySelector(".task-info");
    let taskText = taskItem.querySelector("span:first-child").textContent;
    let dateText = taskItem.querySelector("span:last-child").textContent;
    tasks.push({ task: taskText, date: dateText });
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    let tasks = JSON.parse(storedTasks);
    tasks.forEach(function (task) {
      let listItem = document.createElement("li");
      let taskInfo = document.createElement("div");
      taskInfo.classList.add("task-info");
      let taskSpan = document.createElement("span");
      taskSpan.textContent = task.task;
      let dateSpan = document.createElement("span");
      dateSpan.textContent = task.date;
      taskInfo.appendChild(taskSpan);
      taskInfo.appendChild(dateSpan);
      let removeButton = document.createElement("button");
      removeButton.textContent = "Completed";
      listItem.appendChild(removeButton);
      removeButton.addEventListener("click", function () {
        list.removeChild(listItem);
        saveTasks();
      });
      listItem.appendChild(taskInfo);
      listItem.appendChild(removeButton);
      list.appendChild(listItem);
    });
  }
}
