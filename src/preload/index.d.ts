import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    Go: any
    startUp: (pinValue: string) => Promise<void>
    generateInternalKeyBundle: () => Promise<string>
    saveInternalKey: (keyBundle: string) => Promise<string>
    populateExternalKeyBundle: () => Promise<void>
    electron: ElectronAPI
    api: {
      readAuthFile(): Promise<string>
      writeAuthFile(content: string): Promise<void>
      checkAuthFile(content: string): Promise<boolean>
    }
  }
}
