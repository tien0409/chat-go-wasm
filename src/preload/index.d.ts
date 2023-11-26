import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    Go: any
    startUp: (pinValue: string) => Promise<void>
    generateInternalKeyBundle: () => Promise<string>
    populateExternalKeyBundle: () => Promise<{keyId: string, keyBundle: string}>
    saveInternalKey: (keyBundle: string) => Promise<any>
    populateExternalKeyBundle: () => Promise<void>
    initRatchetFromInternal: (keyBundle: string) => Promise<any>
    saveRatchet: (ratchetId: string) => Promise<void>
    loadInternalKey: (internalKey: string) => Promise<string>
    sendMessage: (ratchetId: string, isBinary: boolean, message: string) => Promise<any>
    isRatchetExist: (ratchetId: string) => Promise<boolean>
    electron: ElectronAPI
    api: {
      readAuthFile(): Promise<string>
      createAuthFile(): Promise<void>
      writeAuthFile(content: string): Promise<void>
      checkAuthFile(content: string): Promise<boolean>
      existAuthFile(): Promise<boolean>
      getInternalKey(): Promise<string>
      writeRatchetFile(username: string, ratchetData: any): Promise<void>
      getRatchetId(username: string): Promise<string>
    }
  }
}
