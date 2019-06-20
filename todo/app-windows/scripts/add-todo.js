const electron = require('electron');

const { ipcRenderer } = electron;

const getToDoInputValue = () => {
    return document.getElementById('todo-name').value;
}

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = getToDoInputValue();

    ipcRenderer.send('todo:form-send', inputValue);
})

