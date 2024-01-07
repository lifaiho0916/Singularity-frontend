import { PropsWithChildren } from "react"

export interface DraggableModalProps extends PropsWithChildren {
    isOpen: boolean;
    onRequestClose: () => void;
}