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

function showTask(title) {
    listContainer.insertAdjacentHTML(
        "beforeend",
        `<li>
            ${title}<span class="icon">×</span>
        </li>
        `
    );
}

async function loadAndDisplayTasks() {
  const tasks = await fetchTasks();
  tasks.forEach(task => {
    showTask(task.title);
  });
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

// shows the checked icon when the user clicks on the circle icon of the task and when the user clicks on "x" remove the item from the to-do list
listContainer.addEventListener(
    "click",
    function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveData();
        }
    },
    false
);

//when page is refreshed any task is lost
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

//shows data whenever we open the website again
document.addEventListener("DOMContentLoaded", loadAndDisplayTasks);
