let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Add Task */
function addTask() {
  const name = document.getElementById("taskName").value;
  const subject = document.getElementById("subject").value;
  const priority = document.getElementById("priority").value;

  if (!name) return alert("Enter task!");

  tasks.push({
    name,
    subject,
    priority,
    completed: false
  });

  saveTasks();
  displayTasks();
}

/* Display Tasks */
function displayTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";

  tasks.forEach((task, index) => {
    list.innerHTML += `
      <div class="task">
        <span>${task.name} (${task.subject})</span>
        <div>
          <button onclick="toggleTask(${index})">✔</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      </div>
    `;
  });

  updateProgress();
}

/* Toggle */
function toggleTask(i) {
  tasks[i].completed = !tasks[i].completed;
  saveTasks();
  displayTasks();
}

/* Delete */
function deleteTask(i) {
  tasks.splice(i, 1);
  saveTasks();
  displayTasks();
}

/* Progress */
function updateProgress() {
  const done = tasks.filter(t => t.completed).length;
  const total = tasks.length;

  const percent = total ? (done / total) * 100 : 0;

  const bar = document.getElementById("progressFill");
  if (bar) bar.style.width = percent + "%";
}

/* Load */
window.onload = displayTasks;