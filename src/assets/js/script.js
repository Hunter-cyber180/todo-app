const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// this function checks if there's some content in the inputBox and adds a new task in the LI element
function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        let newTask = document.createElement("li");
        newTask.innerHTML = inputBox.value;
        listContainer.appendChild(newTask);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        newTask.appendChild(span);
    }
    //clean inputBox after adding a new task
    inputBox.value = "";
    saveData();
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
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
