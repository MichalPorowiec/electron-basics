import electron from 'electron';
import ffmpeg from 'fluent-ffmpeg';

const { app, BrowserWindow, ipcMain } = electron;

app.on('ready', () => {
    mainWindowBehavior();
})

const mainWindowBehavior = () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    videoTimeHandler(mainWindow);

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
}

const videoTimeHandler = (mainWindowRef) => {
    ipcMain.on('video:uploaded',(event, path) => {
        ffmpeg.ffprobe(path,(error, data) => {
            mainWindowRef.webContents.send('video:watchTime-shown', data.format.duration)
        })
    })
}