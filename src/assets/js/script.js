const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const url = "http://localhost:4000/todos";

// get all todos
async function fetchTasks() {
    try {
        // get all todos from sevrer
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const { data } = await response.json();
        return data;
    } catch (error) {
        // log error if there was a problem getting todos
        console.log("Error getting todos");
        return [];
    }
}

function showTask(title, id, status) {
    // Checking todo status and setting classname for todo
    const checkedClass = status === "completed" ? "checked" : "";

    // Add todo to listConatiner to display it
    listContainer.insertAdjacentHTML(
        "beforeend",
        `<div>
            <li class="${checkedClass}">
                <p onclick="toggleStatus('${id}')">${title}</p>
                <span onclick="removeTask('${id}')"> ×</span>
            </li>
        </div>
        `
    );
}

// display todos
async function loadAndDisplayTasks() {
    const tasks = await fetchTasks(); // get all todos

    // display all todos
    tasks.forEach(task => {
        showTask(task.title, task._id, task.status);
    });
}

// toggleStatus function to change todo status
async function toggleStatus(id) {
    try {
        // get todo from server
        const response = await fetch(`${url}/${id}`);
        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const { data } = await response.json();

        try {
            // Reverse todo status
            const taskStatus = data.status === "completed" ? "pending" : "completed";

            // send update request to server
            const res = await fetch(`${url}/${id}`,
                {
                    headers: { "Content-Type": "application/json" },
                    method: "PUT",
                    body: JSON.stringify({ title: data.title, status: taskStatus })
                });

            if (res.status == 200)
                alert("task updated!");

            // clean listContainer after updating a task and display updated tasks
            listContainer.innerHTML = "";
            loadAndDisplayTasks();

        } catch (error) {
            // log error if there was a problem updating todo
            console.log("Error update todo");
        }
    } catch (error) {
        // log error if there was a problem getting todo
        console.log("Error getting todo");
    }
}

// this function checks if there's some content in the inputBox and adds a new task in the LI element
async function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        try {
            // send post request to server to add a new todo
            const response = await fetch(url,
                {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({ title: inputBox.value })
                });

            if (response.status == 201)
                alert("task added!");

        } catch (error) {
            // log error if there was a problem adding todo
            console.log("Error post todo");
        }
    }
    //clean inputBox after adding a new task
    inputBox.value = "";
    listContainer.innerHTML = "";
    loadAndDisplayTasks();
}

// delete a todo
async function removeTask(id) {
    try {
        // send delete request to server
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.status == 200)
            alert("task deleted!");

    } catch (error) {
        // log error if there was a problem deleting todo
        console.log("Error delete todo!");
    }
}

// delete all todos
async function deleteAll() {
    try {
        // send delete request to server
        const response = await fetch(`${url}/all`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.status == 200) {
            alert("All tasks were deleted.");
            listContainer.innerHTML = "";
            loadAndDisplayTasks();
        }

    } catch (error) {
        // log error if there was a problem deleting todos
        console.log("Error delete all todos!");
    }
}

//shows data whenever we open the website again
document.addEventListener("DOMContentLoaded", loadAndDisplayTasks);
