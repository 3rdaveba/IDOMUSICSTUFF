declare module 'react-simple-maps' {
  import { ComponentType, ReactNode, CSSProperties, MouseEvent } from 'react'

  interface GeographyProps {
    geography?: object
    key?: string
    style?: {
      default?: CSSProperties
      hover?: CSSProperties
      pressed?: CSSProperties
    }
    onMouseEnter?: (e: MouseEvent<SVGPathElement>) => void
    onMouseLeave?: (e: MouseEvent<SVGPathElement>) => void
    onClick?: (e: MouseEvent<SVGPathElement>) => void
  }

  interface GeographiesProps {
    geography: string | object
    children: (data: { geographies: Array<{ rsmKey: string; properties: { ISO_A3: string; NAME: string; [key: string]: unknown }; id?: string; geometry: object }> }) => ReactNode
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
    onMoveStart?: (event: unknown, position: { coordinates: [number, number]; zoom: number }) => void
    onMoveEnd?: (event: unknown, position: { coordinates: [number, number]; zoom: number }) => void
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
