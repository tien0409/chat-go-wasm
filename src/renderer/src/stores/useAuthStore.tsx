import { create } from 'zustand'

interface IAuthStore {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
}

const useAuthStore = create<IAuthStore>((set) => ({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({ isAuth })
}))

export default useAuthStore
