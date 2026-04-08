function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") {
        alert("Enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = taskText;

    // mark complete
    li.onclick = function () {
        li.classList.toggle("completed");
    };

    // delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
    input.value = "";
}