let password = "";
let tasks = [];
let isPasswordSet = false;

// Set the password
function setPassword() {
    password = document.getElementById('password').value;
    if (password) {
        isPasswordSet = true;
        alert("Password set successfully!");
        document.getElementById('set-password-section').style.display = 'none'; // Hide password set section
    } else {
        alert("Please set a password.");
    }
}

// Show the password modal when viewing tasks
function showPasswordModal() {
    if (!isPasswordSet) {
        alert("Please set a password first.");
        return;
    }

    const passwordModal = document.getElementById('password-modal');
    passwordModal.style.display = 'block';
}

// Verify the entered password
function verifyPassword() {
    const enteredPassword = document.getElementById('entered-password').value;
    if (enteredPassword === password) {
        document.getElementById('password-modal').style.display = 'none';
        displayTasks(); // Show tasks if password is correct
    } else {
        alert("Incorrect password.");
    }
}

// Add a new task
function addTask() {
    const name = document.getElementById('task-name').value;
    const deadline = document.getElementById('task-deadline').value;
    const category = document.getElementById('task-category').value;

    if (name && deadline && category) {
        const priority = getPriority(deadline);
        const newTask = {
            name: name,
            deadline: deadline,
            category: category,
            priority: priority,
            completed: false
        };

        tasks.push(newTask);
        // Do not display tasks immediately, just clear the form
        clearTaskForm();
    } else {
        alert("Please fill in all fields.");
    }
}

// Get task priority based on deadline
function getPriority(deadline) {
    const today = new Date();
    const dueDate = new Date(deadline);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); // Difference in days

    if (diffDays <= 3) {
        return 'High';
    } else if (diffDays <= 7) {
        return 'Medium';
    } else {
        return 'Low';
    }
}

// Display tasks in the table
function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the table first

    if (tasks.length === 0) {
        taskList.innerHTML = "<tr><td colspan='6'>No tasks available.</td></tr>";
    } else {
        tasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.priority}</td>
                <td>${task.category}</td>
                <td>${task.name}</td>
                <td>${task.deadline}</td>
                <td>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleCompletion(${index})">
                </td>
                <td>
                    <button onclick="editTask(${index})">Edit</button>
                </td>
            `;
            taskList.appendChild(row);
        });
    }
    document.getElementById('task-section').style.display = 'block'; // Show the task section
}

// Toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

// Edit a task
function editTask(index) {
    const task = tasks[index];
    const newName = prompt("Edit task name", task.name);
    const newDeadline = prompt("Edit deadline", task.deadline);
    const newCategory = prompt("Edit category", task.category);

    if (newName && newDeadline && newCategory) {
        tasks[index].name = newName;
        tasks[index].deadline = newDeadline;
        tasks[index].category = newCategory;
        tasks[index].priority = getPriority(newDeadline); // Recalculate priority

        displayTasks();
    }
}

// Clear the task form after adding a task
function clearTaskForm() {
    document.getElementById('task-name').value = '';
    document.getElementById('task-deadline').value = '';
    document.getElementById('task-category').value = '';
}
