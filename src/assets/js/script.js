const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const url = "http://localhost:4000/todos";

async function fetchTasks() {
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.log("Error getting todos");
        return [];
    }
}

function showTask(title, id, status) {
    const checkedClass = status === "completed" ? "checked" : "";
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

async function loadAndDisplayTasks() {
    const tasks = await fetchTasks();
    tasks.forEach(task => {
        showTask(task.title, task._id, task.status);
    });
}

async function toggleStatus(id) {
    try {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const { data } = await response.json();

        try {
            const taskStatus = data.status === "completed" ? "pending" : "completed";

            const res = await fetch(`${url}/${id}`,
                {
                    headers: { "Content-Type": "application/json" },
                    method: "PUT",
                    body: JSON.stringify({ title: data.title, status: taskStatus })
                });

            if (res.status == 200)
                alert("task updated!");

            listContainer.innerHTML = "";
            loadAndDisplayTasks();

        } catch (error) {
            console.log("Error update todo");
        }
    } catch (error) {
        console.log("Error getting todo");
    }
}

// this function checks if there's some content in the inputBox and adds a new task in the LI element
async function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        try {
            const response = await fetch(url,
                {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({ title: inputBox.value })
                });

            if (response.status == 201)
                alert("task added!");

        } catch (error) {
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
