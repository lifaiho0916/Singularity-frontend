import { IElement } from 'libs/types/index';

export interface SubScreenProps {
    isToolItemSelected: boolean
    setToolItemSelected: (value: boolean) => void
    setMouseOut: (value: boolean) => void
    currentToolId: number
    view: IElement
}