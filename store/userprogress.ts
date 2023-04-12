import { create } from "zustand"
import { UserProgress } from "@/types"

type UserProgressStore = {
  progressCount: number
  setUserProgressCount: (progressCount: number) => Promise<void>
}

export const useUserProgressStore = create<UserProgressStore>((set, get) => ({
  progressCount: 0,

  setUserProgressCount: async (progressCount: number) => {
    set({ progressCount })
  },
}))
