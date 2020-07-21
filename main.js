// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path')
dev = true;

var menu = new Menu();
//menu.append(new MenuItem({ role: 'filemenu' }));

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    titleBarStyle: 'hidden'
  })

  var template = [
    {
      role: 'appmenu'
    },
    {
      label: 'File', submenu: [
        { label: 'New', accelerator: 'CmdOrCtrl+N', click() { mainWindow.webContents.send('NewFile') } },
        { label: 'Open', accelerator: 'CmdOrCtrl+O', click() { mainWindow.webContents.send('OpenFile') } },
        { label: 'Save', accelerator: 'CmdOrCtrl+S', click() { mainWindow.webContents.send('SaveFile') } },
        { label: 'Save As...', accelerator: 'CmdOrCtrl+Shift+S', click() { mainWindow.webContents.send('SaveAs') } },
        { label: 'Close', click() {mainWindow.webContents.send('CloseFile')} },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: function () { app.quit(); } }
      ]
    },
    {
      label: 'View', submenu: [
        { label: 'HTML/Markdown' }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin' || dev) app.quit()
})

// Show dialogs.
ipcMain.on('ShowSaveDialog', (e) => {
  e.returnValue = dialog.showSaveDialogSync({
    title: 'Save file'
  });
});

ipcMain.on('ShowDialogBox', (e, a) => {
  dialog.showMessageBox(a).then((d) => {
    e.returnValue = d;
  });
})

ipcMain.on('ShowOpenDialog', (e, a) => {
  e.returnValue = dialog.showOpenDialogSync({
    title: 'Open file',
    ...a
  });
})