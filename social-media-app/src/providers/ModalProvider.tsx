import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react"
import { ProviderProps } from "../types/props"
import ModalContainer from "../containers/ModalContainer"

interface ModalProviderProps extends ProviderProps {}

interface ModalProviderValue {
  openModal: (modal: ReactNode) => void
  closeModal: () => void
}

const context = createContext({} as ModalProviderValue)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ReactNode | null>(null)

  const openModal = useCallback(
    (node: ReactNode) => {
      setModal(node)
    },
    [setModal]
  )

  const closeModal = useCallback(() => {
    setModal(null)
  }, [setModal])

  const value = useMemo(
    () => ({ openModal, closeModal } as ModalProviderValue),
    [openModal, closeModal]
  )

  return (
    <context.Provider value={value}>
      {children}
      <ModalContainer open={modal !== null}>{modal}</ModalContainer>
    </context.Provider>
  )
}

export default ModalProvider

export const useModal = () => useContext(context)
