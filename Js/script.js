var taskInput = document.getElementById("task");
var taskStatusInput = document.getElementById("taskStatus");
var mood = 'add';
var unKnown ; 

var taskContainer = [];

if (localStorage.getItem('task')==null) {
    taskContainer = [];
}
else{
    taskContainer = JSON.parse(localStorage.getItem('task'));
    displayTask(taskContainer);
}

function addTask() {
    if (taskInput.value === '' || taskStatusInput.value === '') {
        alert("You must write something!");
    }
    else{
        var task={
            name:taskInput.value,
            status:taskStatusInput.value,
        }
        if (mood === 'add') {
            taskContainer.push(task); 
        }
        else{
            taskContainer[unKnown]=task;
            mood = 'add';
            document.getElementById("addButton").innerHTML = 'Add'
        }
        localStorage.setItem('task' , JSON.stringify(taskContainer));
    
        displayTask(taskContainer);

        clearInput();   
    }
}

function displayTask(taskContainer){
    var cartoona = ``;

    for (var i = 0; i < taskContainer.length; i++) {

        cartoona += `
        <tr>
            <td>${i+1}</td>
            <td>${taskContainer[i].name}</td>
            <td>${taskContainer[i].status}</td>
            <td>
                <button onClick = "editTask(${i})" class="btn btn-warning">Edit</button>
            </td>
            <td>
                <button onClick="deleteTask(${i})" class="btn btn-danger">Delete</button>
            </td>
        </tr>`
    }
    document.getElementById('tableRow').innerHTML=cartoona;
}

function clearInput() {
    taskInput.value = '' ;
    taskStatusInput.value = '' ;
}

function deleteTask(Input) {
    taskContainer.splice(Input,1);

    localStorage.setItem('task' , JSON.stringify(taskContainer));

    displayTask(taskContainer);
}

function editTask(i) {
    taskInput.value = taskContainer[i].name;
    taskStatusInput.value = taskContainer[i].status;
    document.getElementById('addButton').innerHTML='Edit';
    mood = 'edit'
    unKnown = i;
}

function searchTask(term) {
    var taskSearchContainer = []; 

    for (var i = 0; i < taskContainer.length; i++) {

        if (taskContainer[i].name.toLowerCase().includes(term.toLowerCase()) || taskContainer[i].status.toLowerCase().includes(term.toLowerCase())) {
            taskSearchContainer.push(taskContainer[i]); 
        }
    }

    displayTask(taskSearchContainer);
}
