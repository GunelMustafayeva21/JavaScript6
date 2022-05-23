let addTaskBtn = document.getElementById("add-task");
let removeTaskBtn = document.getElementById("remove-task");
let removeSelectedTaskBtn = document.getElementById("remove-selected-task");
let taskInput = document.querySelector("input.task-title");
let taskWrapper = document.querySelector(".tasks .list-group");



taskInput.addEventListener("keypress", function (e) {
  if (e.keyCode == 13) {
    saveTask();
  }
})
addTaskBtn.addEventListener("click", saveTask)

function saveTask() {
  if(localStorage.getItem("Tasks")===null || JSON.parse(localStorage.getItem("Tasks")).length==0)
  {  localStorage.setItem("Tasks","[]");} 
  if (taskInput.value.trim() !== "") {
 let Tasks=JSON.parse(localStorage.getItem("Tasks"));
 let task={
  text: taskInput.value,
  date: getTime()
}
Tasks.push(task);
localStorage.setItem("Tasks", JSON.stringify(Tasks));
location.reload();
}
}

let Tasks= JSON.parse(localStorage.getItem("Tasks"));
for (let task of Tasks) {
  let newTaskElem =
      "<li class='list-group-item d-flex justify-content-between align-items-center'>" +
      task.text +
      "<span class='badge rounded-pill bg-primary'>" + task.date + "</span>"
    "</li>";
    taskWrapper.innerHTML = newTaskElem + taskWrapper.innerHTML;
}
    taskInput.value = "";
    removeTaskBtn.classList.remove("d-none");
    removeSelectedTaskBtn.classList.remove("d-none");

removeTaskBtn.addEventListener("click", () => {
  if (window.confirm('Do you really want to delete all tasks?')) {
    document.querySelectorAll(".list-group-item").forEach(e => {
      e.remove();
      localStorage.removeItem("Tasks");
    })
    removeTaskBtn.classList.add("d-none")
    removeSelectedTaskBtn.classList.add("d-none")
  } else {
    alert("No problem didn't delete any!");
  }
})


removeSelectedTaskBtn.addEventListener("click", () => {
  document.querySelectorAll(".list-group-item.active").forEach(e => {e.remove();})
  let Tasks= JSON.parse(localStorage.getItem("Tasks"));
  for (const item of Tasks) {
    if(item.getAttribute("class").includes("active")==true)
    localStorage.removeItem(item);
  }
})


function getTime() {
  let now = new Date();
  return `${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}.${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1}.${now.getFullYear()} / ${now.getHours()}:${now.getMinutes()}`;
}

document.addEventListener("click", function (e) {
  if (e.target.getAttribute("class").includes("list-group-item")) {
    if (!e.target.getAttribute("class").includes("active")) {
      e.target.classList.add("active")
    }
    else {
      e.target.classList.remove("active")
    }
  }
})