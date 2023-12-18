import { PropsWithChildren } from "react"

export interface WrapperProps extends PropsWithChildren {
    style: {},
    viewType: 'Vertical' | 'Horizontal' | undefined
}