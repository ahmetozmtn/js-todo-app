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
