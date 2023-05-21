import { ProviderProps } from "../types/props"
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from "react"
import { useAuth } from "./CognitoAuthProvider"
import { io, Socket } from "socket.io-client"

interface MessagingSocketProviderProps extends ProviderProps {
  socketUrl: string
}

interface MessagingSocketProviderValue {
  socket: Socket
  emit: (message: string, data: any) => void
}

const context = createContext({} as MessagingSocketProviderValue)

const MessagingSocketProvider: FC<MessagingSocketProviderProps> = ({
  socketUrl,
  children
}) => {
  const socket = useRef(io(socketUrl, { autoConnect: false }))
  const { getCurrentUser } = useAuth()

  const disconnectSocketServer = useCallback(() => {
    console.log("deregister")
    if (socket.current.connected) {
      socket.current.emit("deregister")
      socket.current.disconnect()
    }
  }, [])

  const emit = useCallback((message: string, data: any) => {
    if (socket.current.connected) {
      socket.current.emit(message, data)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      const user = getCurrentUser()
      if (user && !socket.current.connected) {
        console.log("connect & register")
        socket.current.connect()
        socket.current.on("connect", () => {
          socket.current.emit("register", {
            accountName: user.Username
          })
        })
      } else {
        disconnectSocketServer()
      }
    })()
  }, [disconnectSocketServer, getCurrentUser])

  useEffect(() => {
    window.addEventListener("beforeunload", disconnectSocketServer)
    return disconnectSocketServer
  }, [disconnectSocketServer])

  const value = useMemo(
    () => ({
      socket: socket.current,
      emit
    }),
    [emit]
  )

  return <context.Provider value={value}>{children}</context.Provider>
}

export default MessagingSocketProvider

export const useMessagingSocket = () => useContext(context)
