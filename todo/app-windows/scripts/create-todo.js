const electron = require('electron');

const { ipcRenderer } = electron;

ipcRenderer.on('todo:create-new', (event, todoMessage) => {
    createNewToDo(todoMessage);
})

const createNewToDo = (todoMessage) => {
    const newLi = document.createElement('li');
    newLi.appendChild(document.createTextNode(todoMessage));

    document.getElementById('todo-list').appendChild(newLi);
}