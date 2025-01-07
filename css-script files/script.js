const menuContent = document.querySelector('.menuContent');
const menuIcon = document.querySelector('.fa');
const taskSection = document.querySelector('.tasks');
const textarea = document.querySelector('textarea');
const addTask = document.querySelector('#addTask');
const taskCount = document.querySelectorAll('.taskCount');
const taskList = document.querySelector('.taskList');
const taskTodo = document.querySelector('.taskTodo');
const taskType = [{allTasks: 0},{completedTasks: 0},{uncompletedTasks: 0}];
const popOutMsg = document.getElementById('pop-out');
const deleteTask= document.querySelector('.delete-task');
const buttonTaskType = document.querySelectorAll('.buttonTask');
let newTask, newTaskTodo, newEmojiButtonsDiv, newEmojiButton_1, newEmojiButton_2, loop, allTasks;
addTask.addEventListener('click', (e) => {
    e.preventDefault();
    if (!textarea.value || textarea.value===' ') {
        alert("Sorry we can't add an empty task");
    }
    else {
        taskType[0].allTasks+=1;
        taskType[2].uncompletedTasks+=1;
        newTask = document.createElement('li');
        newTaskTodo = document.createElement('p');
        newEmojiButtonsDiv = document.createElement('div');
        newEmojiButton_1 = document.createElement('button');
        newEmojiButton_2 = document.createElement('button');
        taskList.append(newTask);
        newTask.append(newTaskTodo);
        newTask.append(newEmojiButtonsDiv);
        newEmojiButtonsDiv.append(newEmojiButton_1);
        newEmojiButtonsDiv.append(newEmojiButton_2);
        newTask.classList.add('theTask');
        newTaskTodo.classList.add('taskTodo');
        newEmojiButtonsDiv.classList.add('emojis');
        newEmojiButton_1.classList.add('emojiButton');
        newEmojiButton_2.classList.add('emojiButton');
        newEmojiButton_1.innerText = '✅\nTask Completed';
        newEmojiButton_2.innerText =  '🗑️\nDelete Task';
        newTaskTodo.innerText = `${taskType[0].allTasks}. ${textarea.value}`;
        textarea.value = ' ';
        taskCount[0].innerText = taskType[0].allTasks;
        taskCount[2].innerText = taskType[2].uncompletedTasks;
        allTasks = document.querySelectorAll('.theTask');
    }
});
let completedTaskFunction = (element) => {
        if (element.parentElement.previousElementSibling.classList.contains('lineThrough')) {
            element.parentElement.previousElementSibling.classList.remove('lineThrough');
            taskCount[1].innerText = taskType[1].completedTasks-=1;
            taskCount[2].innerText = taskType[2].uncompletedTasks+=1;
        }
        else {
            element.parentElement.previousElementSibling.classList.add('lineThrough');
            taskCount[1].innerText = taskType[1].completedTasks+=1;
            taskCount[2].innerText = taskType[2].uncompletedTasks-=1;
        }
    }
let deleteTaskFunction = (element) => {
    if (popOutMsg.classList.contains('hidden')) {
        popOutMsg.classList.remove('hidden');
        popOutMsg.firstElementChild.innerText = `Are you sure you want to delete task: \n${element.parentElement.previousElementSibling.innerText}`;
        deleteTask.addEventListener('click', (e) => {
            if (e.target.innerText === 'Confirm') {
                console.log(element.parentElement.parentElement);
                taskList.removeChild(element.parentElement.parentElement);
                taskCount[0].innerText = taskType[0].allTasks-=1;
                if (element.parentElement.previousElementSibling.classList.contains('lineThrough')) {
                    taskCount[1].innerText = taskType[1].completedTasks-=1;
                }
                else {
                    taskCount[2].innerText = taskType[2].uncompletedTasks-=1;
                    console.log(taskType[2].uncompletedTasks);
                }
                popOutMsg.classList.add('hidden');
            }
            else if (e.target.innerText === 'Cancel') {
                popOutMsg.classList.add('hidden');
            }
        })
    }
}
taskList.addEventListener('click', (e) => {
    if (e.target.innerText === '✅\nTask Completed') {
        completedTaskFunction(e.target);
    }
    else if (e.target.innerText === '🗑️\nDelete Task') {
        deleteTaskFunction(e.target);
    }
});
buttonTaskType.forEach((button) => {
    button.addEventListener('click',() => {
        if (button.innerText === 'All Tasks') {
                for (loop = 0; loop < allTasks.length; loop++) {
                    if (allTasks[loop].classList.contains('theTask')) {
                        allTasks[loop].style.display = 'flex';
                }
            }
        }
        else if (button.innerText === 'Completed Tasks') {
            for (loop = 0; loop < allTasks.length; loop++) {
                if (!(allTasks[loop].firstElementChild.classList.contains('lineThrough'))) {
                    allTasks[loop].style.display = 'none';
                }
            }
        }
        else if (button.innerText === 'Uncompleted Tasks') {
            for (loop = 0; loop < allTasks.length; loop++) {
                if (allTasks[loop].firstElementChild.classList.contains('lineThrough')) {
                    allTasks[loop].style.display = 'none';
                }
                else {
                    allTasks[loop].style.display = 'flex';
                }
            }
        }
    })
}); 
menuIcon.addEventListener('click',() => {
    if (menuContent.classList.contains('hidden_menu')) {
        menuContent.classList.remove('hidden_menu');
    }
    else {
        menuContent.classList.add('hidden_menu');
    }
});
