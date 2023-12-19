import { IElement, IStructure } from "libs/types";

export interface MainWorkspaceProps {
  root : IElement,
  zoom : number,
  pageIndex: number
  setPageIndex: (value : number) => void
  page: any
  setPage: (value: any) => void
  screens: any
  structure: IStructure | null
}