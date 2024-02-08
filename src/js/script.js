let list = document.querySelector("ul.list");
let btnAdd = document.getElementById("btnAdd");
let listTask = [];
let taskInput = document.getElementById("enterTask");

if (localStorage.getItem("listTask") != null) {
    listTask = JSON.parse(localStorage.getItem("listTask"));
}

btnAdd.onclick = function (event) {
    event.preventDefault();
    let content = document.getElementById("enterTask").value;
    if (content != "") {
        listTask.unshift({
            content: content,
            status: "doing",
        });
    }
    addTask();
    document.getElementById("enterTask").value = "";
    saveLocalStorage();
};

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        btnAdd.click();
    }
});

function saveLocalStorage() {
    localStorage.setItem("listTask", JSON.stringify(listTask));
}

function addTask() {
    list.innerHTML = "";

    if (listTask.length > 0) {
        listTask.forEach((task, index) => {
            let newTask = document.createElement("li");
            if (task.status == "complete") {
                newTask.classList.add("opacity-60");
            }

            newTask.innerHTML = `
            <div class="flex justify-between items-center w-auto p-2 my-2 shadow-md rounded-md bg-blue-400">
                <div class="flex items-center">
                    <div class="flex justify-start mx-2" onclick="completeTask(${index})">
                        <svg class="w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                        </svg>
                    </div>
                    <div class="flex justify-start w-auto">${task.content}</div>
                </div>
                <div class="flex justify-center items-center mx-2" onclick="deleteTask(${index})">
                    <svg class="w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6m0 12L6 6"></path>
                    </svg>
                </div>
            </div>
            `;
            list.appendChild(newTask);
        });
    } else {
        let emptyTaskMessage = document.createElement("div");
        emptyTaskMessage.classList.add(
            "w-full",
            "text-center",
            "bg-blue-400",
            "p-2",
            "my-2",
            "rounded-md",
            "shadow-md"
        );
        emptyTaskMessage.textContent = "To do list is empty";
        list.appendChild(emptyTaskMessage);
    }
}

addTask();

function completeTask(index) {
    if (listTask[index].status == "doing") {
        listTask[index].status = "complete";
    } else {
        listTask[index].status = "doing";
    }
    saveLocalStorage();
    addTask();
}
