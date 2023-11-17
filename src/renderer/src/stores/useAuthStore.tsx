import { create } from 'zustand'

interface IAuthStore {
  userInfo: {
    id: string
    username: string
    aliasName: string
  } | null
  setUserInfo: (userInfo: { id: string; username: string; aliasName: string } | null) => void
  signingIn: boolean
  setSigningIn: (signingIn: boolean) => void
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
}

const useAuthStore = create<IAuthStore>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: { username: string; id: string; aliasName: string } | null) =>
    set({ userInfo }),
  signingIn: false,
  setSigningIn: (signingIn: boolean) => set({ signingIn }),
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({ isAuth })
}))

export default useAuthStore
