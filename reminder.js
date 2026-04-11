let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* Show reminders */
function displayReminders() {
  const list = document.getElementById("reminderList");
  list.innerHTML = "";

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  tasks.forEach(task => {
    if (!task.completed && task.dueDate) {

      list.innerHTML += `
        <div class="task">
          <span>
            <b>${task.name}</b> <br>
            📅 Due: ${task.dueDate}
          </span>
        </div>
      `;

      // 🔔 Trigger alert if due today
      if (task.dueDate === today) {
        triggerAlert(task.name);
      }
    }
  });
}

/* 🔔 Alert Function */
function triggerAlert(taskName) {

  // Popup
  setTimeout(() => {
    alert(`⏰ Reminder: "${taskName}" is due today!`);
  }, 500);

  // 🔊 Sound
  const sound = document.getElementById("alertSound");
  if (sound) sound.play();

  // 📳 Vibration (mobile only)
  if ("vibrate" in navigator) {
    navigator.vibrate([300, 100, 300]); // vibration pattern
  }
}

/* Load */
window.onload = displayReminders;