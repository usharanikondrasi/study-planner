let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* Save */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Priority Label */
function getPriorityLabel(priority) {
  if (priority === "High") return "🔥 High Priority (Do First)";
  if (priority === "Medium") return "⚡ Medium Priority";
  if (priority === "Low") return "🌿 Low Priority (Flexible)";
  return "No Priority";
}

/* Add Task */
function addTask() {
  const name = document.getElementById("taskName").value;
  const subject = document.getElementById("subject").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;

  if (name === "" || priority === "") {
    alert("Please fill all required fields!");
    return;
  }

  tasks.push({
    name,
    subject,
    priority,
    dueDate,
    completed: false
  });

  saveTasks();
  displayTasks();

  // Clear inputs
  document.getElementById("taskName").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("priority").value = "";
  document.getElementById("dueDate").value = "";
}

/* Display Tasks */
function displayTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];

  tasks.forEach((task, index) => {

    let overdueClass = "";
    if (task.dueDate && task.dueDate < today && !task.completed) {
      overdueClass = "style='color:red; font-weight:bold;'";
    }

    list.innerHTML += `
      <div class="task">
        <span ${overdueClass}
          style="text-decoration:${task.completed ? 'line-through' : 'none'}">
          
          <b>${task.name}</b> (${task.subject || "No Subject"}) <br>
          📅 Due: ${task.dueDate || "No date"} <br>
          ${getPriorityLabel(task.priority)}
        </span>

        <div>
          <button onclick="toggleTask(${index})">✔</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      </div>
    `;
  });

  updateProgress();
  checkReminders();
}

/* Toggle Complete */
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

/* Delete Task */
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

/* Progress */
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  const percent = total ? (completed / total) * 100 : 0;

  const bar = document.getElementById("progressFill");
  if (bar) bar.style.width = percent + "%";
}

/* 🔔 Reminder */
function checkReminders() {
  const today = new Date().toISOString().split("T")[0];

  tasks.forEach(task => {
    if (task.dueDate === today && !task.completed) {
      setTimeout(() => {
        alert(`⏰ Reminder: "${task.name}" is due today!`);
      }, 300);
    }
  });
}

/* Load */
window.onload = displayTasks;
