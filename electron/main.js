const { app, BrowserWindow } = require('electron');
const path = require('path');
const waitOn = require('wait-on');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  waitOn({ resources: ['http://localhost:3000'] }, (err) => {
    if (err) {
      console.error('Failed to load URL:', err);
      app.quit();
    } else {
      createWindow();
    }
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
