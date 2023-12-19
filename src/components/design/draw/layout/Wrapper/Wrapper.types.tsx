import { PropsWithChildren } from "react"
export interface WrapperProps extends PropsWithChildren {
    id: string,
    hasWrapper: boolean
    style: {}
    onHorizontalSplit?: () => void
    onVerticalSplit?: () => void
    onClick?: () => void
}