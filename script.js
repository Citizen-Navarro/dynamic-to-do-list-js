document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 
        // false means: don't save again to Local Storage during loading
    }

    // Add task function, optionally save to Local Storage
    function addTask(taskText, save = true) {
        if (!taskText) {
            alert('Please enter a task.');
            return;
        }

        // Create list item and remove button
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task on click and update Local Storage
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            if (save) { // Update storage only if the task was saved previously
                removeTaskFromStorage(taskText);
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field only if this was a new input (not loading)
        if (save) {
            taskInput.value = '';
            saveTaskToStorage(taskText);
        }
    }

    // Save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask(taskInput.value.trim()));
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });

    // Load tasks when DOM content is loaded
    loadTasks();
});
