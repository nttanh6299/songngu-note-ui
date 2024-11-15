import { createContext, useContext, useState } from "react"

export type PlayAudioContextType = {
  playingAudio: string
  audioUrl: string
  duration: number
  paused: boolean
  setPlayingAudio: (id: string) => void
  setAudioUrl: (audio: string) => void
  setDuration: (duration: number) => void
  setPaused: (paused: boolean) => void
}

export const PlayAudioContext = createContext<PlayAudioContextType>({
  playingAudio: "",
  audioUrl: "",
  duration: 0,
  paused: false,
  setPlayingAudio: () => {},
  setAudioUrl: () => {},
  setDuration: () => {},
  setPaused: () => {},
})

export const usePlayAudio = () => {
  return useContext(PlayAudioContext)
}

export const PlayAudioProvider = ({ children }: React.PropsWithChildren) => {
  const [playingAudio, setPlayingAudio] = useState<string>("")
  const [audioUrl, setAudioUrl] = useState<string>("")
  const [duration, setDuration] = useState<number>(0)
  const [paused, setPaused] = useState<boolean>(false)

  const value = {
    playingAudio,
    audioUrl,
    duration,
    paused,
    setPlayingAudio,
    setDuration,
    setPaused,
    setAudioUrl,
  }

  return (
    <PlayAudioContext.Provider value={value}>
      {children}
    </PlayAudioContext.Provider>
  )
}
