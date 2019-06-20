const electron = require('electron');
const { ipcRenderer } = electron;

const getVideoTime = (path) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send('video:uploaded',path);

        ipcRenderer.on('video:watchTime-shown', (event, videoLength) => {
            resolve(videoLength);
        })
    })
}

const showVideoDuration = (duration) => {
    const durationMessage = `The movie duration is: ${duration.toFixed(2)} s`;

    document.getElementById('video-duration').innerText = durationMessage;
}

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const { path } = document.getElementById('file-uploader').files[0];

    getVideoTime(path).then((duration) => {
        showVideoDuration(duration);
    });

    ipcRenderer.send()
})