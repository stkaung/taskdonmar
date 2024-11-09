const { app, BrowserWindow } = require('electron');
const path = require('path');
const electronReload = require('electron-reload');

electronReload(__dirname, {
    electron: path.join(__dirname, 'node_modules', 'electron', 'dist', 'electron.exe'),
    hardReset: true, // Forces a hard reset
    forceHardReset: true,
});

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    win.setTitle("Taskdonmar")
    win.setMenuBarVisibility(false);
    win.loadURL('http://localhost:3000');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
