import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    Go: any
    startUp: (pinValue: string) => Promise<void>
    generateInternalKeyBundle: () => Promise<string>
    populateExternalKeyBundle: () => Promise<{keyId: string, keyBundle: string}>
    saveInternalKey: (keyBundle: string) => Promise<string>
    populateExternalKeyBundle: () => Promise<void>
    initRatchetFromInternal: (keyBundle: string) => Promise<any>
    loadInternalKey: (internalKey: string) => Promise<string>
    electron: ElectronAPI
    api: {
      readAuthFile(): Promise<string>
      createAuthFile(): Promise<void>
      writeAuthFile(content: string): Promise<void>
      checkAuthFile(content: string): Promise<boolean>
      existAuthFile(): Promise<boolean>
      getInternalKey(): Promise<string>
    }
  }
}
