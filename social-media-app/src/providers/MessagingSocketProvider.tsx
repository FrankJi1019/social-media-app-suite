import { ProviderProps } from "../types/props"
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  // useRef,
  useState
} from "react"
import { useAuth } from "./CognitoAuthProvider"
import { io, Socket } from "socket.io-client"

interface MessagingSocketProviderProps extends ProviderProps {
  socketUrl: string
}

interface MessagingSocketProviderValue {
  socket: Socket | null
  emit: (message: string, data: any) => void
}

const context = createContext({} as MessagingSocketProviderValue)

const MessagingSocketProvider: FC<MessagingSocketProviderProps> = ({
  socketUrl,
  children
}) => {
  const { getAccessTokenWithoutRefresh, currentUser } = useAuth()
  // const socketRef = useRef<Socket | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  const disconnectSocketServer = useCallback(() => {
    if (socket?.connected) {
      socket.emit("deregister")
      socket.disconnect()
    }
  }, [socket])

  const emit = useCallback(
    (message: string, data: any) => {
      if (socket?.connected) {
        socket.emit(message, data)
      }
    },
    [socket]
  )

  useEffect(() => {
    ;(async () => {
      if (!socket && getAccessTokenWithoutRefresh() && currentUser) {
        const newSocket = io(socketUrl, {
          transportOptions: {
            polling: {
              extraHeaders: {
                Authorization: `Bearer ${getAccessTokenWithoutRefresh()}`
              }
            }
          }
        })
        newSocket.on("connect", () => {
          newSocket!.emit("register", {
            accountName: currentUser.Username
          })
        })
        setSocket(newSocket)
        // socket.on("connect", () => {
        //   socket!.emit("register", {
        //     accountName: currentUser.Username
        //   })
        // })
      } else {
        disconnectSocketServer()
      }
    })()
  }, [
    socket,
    disconnectSocketServer,
    currentUser,
    socketUrl,
    getAccessTokenWithoutRefresh
  ])

  useEffect(() => {
    window.addEventListener("beforeunload", disconnectSocketServer)
    return disconnectSocketServer
  }, [disconnectSocketServer])

  const value = useMemo(
    () => ({
      socket,
      emit
    }),
    [emit, socket]
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
    if (socket && socket.connected && !socket.hasListeners(message)) {
      socket.on(message, handler)
    }
    return () => {
      socket && socket.off(message)
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
    if (socket && !socket.hasListeners(message)) {
      socket.on(message, handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler, message, socket, ...deps])
}

export const useUnsubscribeMessage = () => {
  const { socket } = useMessagingSocket()
  return (message: string) => socket?.off(message)
}
