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
  const { getAccessTokenWithoutRefresh } = useAuth()
  const socketRef = useRef(
    io(socketUrl, {
      autoConnect: false,
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${getAccessTokenWithoutRefresh()}`
          }
        }
      }
    })
  )
  const { getCurrentUser } = useAuth()

  const disconnectSocketServer = useCallback(() => {
    if (socketRef.current.connected) {
      socketRef.current.emit("deregister")
      socketRef.current.disconnect()
    }
  }, [])

  const emit = useCallback((message: string, data: any) => {
    if (socketRef.current.connected) {
      socketRef.current.emit(message, data)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      const user = getCurrentUser()
      if (user && !socketRef.current.connected) {
        socketRef.current.connect()
        socketRef.current.on("connect", () => {
          socketRef.current.emit("register", {
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
      socket: socketRef.current,
      emit
    }),
    [emit]
  )

  return <context.Provider value={value}>{children}</context.Provider>
}

export default MessagingSocketProvider

export const useMessagingSocket = () => useContext(context)

export const useSingleSubscribe = (
  message: string,
  handler: (data: any) => void,
  deps: Array<any>
) => {
  const { socket } = useMessagingSocket()
  useEffect(() => {
    if (!socket.hasListeners(message)) {
      socket.on(message, handler)
    }
    return () => {
      socket.off(message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler, message, socket, ...deps])
}

export const usePersistentSubscribe = (
  message: string,
  handler: (data: any) => void,
  deps: Array<any>
) => {
  const { socket } = useMessagingSocket()
  useEffect(() => {
    if (!socket.hasListeners(message)) {
      socket.on(message, handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler, message, socket, ...deps])
}

export const useUnsubscribeMessage = () => {
  const { socket } = useMessagingSocket()
  return (message: string) => socket.off(message)
}
