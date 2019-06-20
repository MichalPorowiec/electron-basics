const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

const addToDo = () => {
    addWindow = new BrowserWindow({
        width: 400,
        height: 250,
        title: 'Add New ToDo',
        webPreferences: {
            nodeIntegration: true
        }
    })

    addWindow.on('closed', () => {
        addWindow = null;
    })

    addWindow.loadURL(`file://${__dirname}/app-windows/add-todo.html`)

    ipcMain.on('todo:form-send', (event, data) => {
        addWindow.close();
        mainWindow.webContents.send('todo:create-new', data)
    })
}

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New ToDo',
                click: addToDo
            },
            {
                label: 'Quit',
                click() {
                    app.quit();
                },
                   accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q'
            }
        ]
    }
];

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        } 
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.loadURL(`file://${__dirname}/app-windows/main.html`);
    mainWindow.on('closed', () => app.quit());
});

if (process.platform === 'darwin') {
    mainMenuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
     mainMenuTemplate.push({
         label: 'View-Developer',
         submenu: [
             {
                 label: 'Toggle Developer Tools',
                 click(item, focusedWindow) {
                     focusedWindow.toggleDevTools();
                 },
                 accelerator: 'ctrl+Shift+I'
             }
         ]
     })
}

