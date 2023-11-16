import { create } from 'zustand'

interface IAuthStore {
  signingIn: boolean
  setSigningIn: (signingIn: boolean) => void
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
}

const useAuthStore = create<IAuthStore>((set) => ({
  signingIn: false,
  setSigningIn: (signingIn: boolean) => set({ signingIn }),
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({ isAuth })
}))

export default useAuthStore
