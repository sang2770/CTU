import { ReactNode } from "react"

export type PositionProps = {
    longitude: any //Kinh độ
    latitude: any //Vĩ độ
}
export type MarkerProps = {
    position: PositionProps
    content: ReactNode
    type: string
    icon:string
}