import { PropsWithChildren } from "react"
export interface WrapperProps extends PropsWithChildren {
    hasWrapper: boolean
    style: {}
    onHorizontalSplit?: () => void
    onVerticalSplit?: () => void
}