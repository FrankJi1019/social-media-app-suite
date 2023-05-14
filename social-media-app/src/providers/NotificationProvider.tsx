import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState
} from "react"
import {
  Alert,
  AlertColor,
  Box,
  Button,
  ButtonProps,
  IconButton,
  Snackbar
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

interface NotificationProviderProps {
  children: ReactNode
}

interface ButtonOption {
  text: string
  props?: ButtonProps
}

interface NotificationOptions {
  type?: AlertColor
  buttonOptions?: Array<ButtonOption>
}

const context = createContext((() => {}) as (
  message: string,
  options?: NotificationOptions
) => void)

const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)
  const [notificationType, setNotificationType] = useState<AlertColor | null>(
    null
  )
  const [btnOptions, setBtnOptions] = useState<Array<ButtonOption> | null>(null)

  const notify = useCallback(
    (message: string, options?: NotificationOptions) => {
      setMessage(message)
      setOpen(true)
      if (options) {
        setNotificationType(options.type || null)
        setBtnOptions(options.buttonOptions || null)
      }
    },
    [setOpen, setMessage]
  )

  const handleClose = useCallback(() => {
    setMessage("")
    setOpen(false)
    setNotificationType(null)
    setBtnOptions(null)
  }, [])

  return (
    <context.Provider value={notify}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={Boolean(notificationType) || message}
        action={
          <Box>
            {btnOptions &&
              btnOptions.map(({ text, props }) => (
                <Button
                  {...props}
                  onClick={(e) => {
                    if (props && props.onClick) {
                      props.onClick(e)
                      setOpen(false)
                    }
                  }}
                >
                  {text}
                </Button>
              ))}
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setOpen(false)}
              sx={{ pl: 1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        {notificationType ? (
          <Alert severity={notificationType} onClose={handleClose}>
            {message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </context.Provider>
  )
}

export default NotificationProvider

export const useNotification = () => useContext(context)
