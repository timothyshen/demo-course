import create from "zustand"

interface AccountStore {
  address: string
  role: string
  setAddress: (address: string) => void
  setRole: (role: string) => void
}

export const useAccountStore = create<AccountStore>((set) => ({
  address: "",
  role: "",
  setAddress: (address: string) => set({ address }),
  setRole: (role: string) => set({ role }),
}))
