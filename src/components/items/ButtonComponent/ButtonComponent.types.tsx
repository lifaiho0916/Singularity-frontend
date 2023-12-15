import { PropsWithChildren } from "react"

export interface ButtonComponentProps extends PropsWithChildren {
    onClick?: () => void;
}