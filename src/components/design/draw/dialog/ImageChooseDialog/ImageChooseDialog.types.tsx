import type { IMedia } from "libs/types"

export interface ImageChooseDialogProps {
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void,
  setComponentImage: (value: IMedia) => void
}