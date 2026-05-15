declare module 'react-simple-maps' {
  import { ComponentType, ReactNode, CSSProperties } from 'react'

  interface GeographyProps {
    geography?: any
    key?: string
    style?: {
      default?: CSSProperties
      hover?: CSSProperties
      pressed?: CSSProperties
    }
    onMouseEnter?: (e: any) => void
    onMouseLeave?: (e: any) => void
    onClick?: (e: any) => void
  }

  interface GeographiesProps {
    geography: string | object
    children: (data: { geographies: any[] }) => ReactNode
  }

  interface ComposableMapProps {
    width?: number
    height?: number
    projection?: string
    projectionConfig?: object
    style?: CSSProperties
    children?: ReactNode
  }

  interface ZoomableGroupProps {
    children?: ReactNode
    center?: [number, number]
    zoom?: number
    minZoom?: number
    maxZoom?: number
    onMoveStart?: (event: any, position: { coordinates: [number, number]; zoom: number }) => void
    onMoveEnd?: (event: any, position: { coordinates: [number, number]; zoom: number }) => void
  }

  interface MarkerProps {
    coordinates: [number, number] // [longitude, latitude]
    children?: ReactNode
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const Geographies: ComponentType<GeographiesProps>
  export const Geography: ComponentType<GeographyProps>
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>
  export const Marker: ComponentType<MarkerProps>
}
