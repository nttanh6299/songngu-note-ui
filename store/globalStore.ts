import { create } from "zustand"

type GlobalStoreType = {
  volume: number
  setVolume: (volume: number) => void
}

export const useGlobalStore = create<GlobalStoreType>((set) => ({
  volume: 0.5,
  setVolume: (volume) => set({ volume }),
}))
