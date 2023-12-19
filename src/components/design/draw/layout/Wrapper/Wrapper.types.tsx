import { PropsWithChildren } from "react"
export interface WrapperProps extends PropsWithChildren {
    id: string
    style: {}
    onHorizontalSplit: ()=>void
    onVerticalSplit: ()=>void
}