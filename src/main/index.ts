import { ipcMain, app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as fs from 'fs'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 920,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      enableBlinkFeatures: 'OverlayScrollbars',
      nodeIntegration: true,
      webSecurity: false
    }
  })
  mainWindow.webContents.openDevTools({
    mode: 'detach'
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  ipcMain.handle('r_readAuthFile', handleReadAuthFile)
  ipcMain.handle('r_writeAuthFile', handleWriteAuthFile)
  ipcMain.handle('r_checkAuthFile', handleCheckAuthFile)

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

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
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

function handleReadAuthFile() {
  try {
    if (fs.existsSync('auth.txt')) {
      return fs.readFileSync('auth.txt', 'utf8')
    } else {
      fs.writeFileSync('auth.txt', 'Auth')
    }
  } catch (error) {
    console.error('ERROR', error)
  }

  return ''
}

function handleWriteAuthFile(_e: Electron.IpcMainInvokeEvent, content: string) {
  try {
    fs.writeFileSync('auth.txt', JSON.stringify(content), 'utf8')
  } catch (error) {
    console.error('ERROR', error)
  }
}

function handleCheckAuthFile(_e: Electron.IpcMainInvokeEvent, newContent: string) {
  try {
    if (!fs.existsSync('auth.txt')) {
      handleWriteAuthFile(null as never, newContent)
      return true
    }

    const authContent = fs.readFileSync('auth.txt', 'utf8')
    return authContent === newContent
  } catch (error) {
    console.error('ERROR', error)
  }
  return false
}
