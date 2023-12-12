import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import IRatchetDetail from '../renderer/src/interfaces/IRatchetDetail'

// Custom APIs for renderer
const api = {
  readAuthFile: () => ipcRenderer.invoke('r_readAuthFile'),
  createAuthFile: () => ipcRenderer.invoke('r_createAuthFile'),
  writeAuthFile: (content: string) => ipcRenderer.invoke('r_writeAuthFile', content),
  checkAuthFile: (content: string) => ipcRenderer.invoke('r_checkAuthFile', content),
  existAuthFile: () => ipcRenderer.invoke('r_existAuthFile'),
  getInternalKey: () => ipcRenderer.invoke('r_getInternalKey'),
  createRatchetFile: (username: string, ratchetDetail: IRatchetDetail, ratchetId) =>
    ipcRenderer.invoke('r_createRatchetFile', username, ratchetDetail, ratchetId),
  getRatchetId: (username: string) => ipcRenderer.invoke('r_getRatchetId', username),
  getRatchetDetailList: (currentUsername: string) =>
    ipcRenderer.invoke('r_getRatchetDetailList', currentUsername),
  getOldChatSessions: (currentUsername: string) =>
    ipcRenderer.invoke('r_getOldChatSessions', currentUsername),
  addMessageToRatchet: (receiver: string, messages: string) =>
    ipcRenderer.invoke('r_addMessageToRatchet', receiver, messages),
  getMessagesByUsername: (username: string) =>
    ipcRenderer.invoke('r_getMessagesByUsername', username)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
