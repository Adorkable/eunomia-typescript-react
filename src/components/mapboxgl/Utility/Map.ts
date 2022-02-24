import {
  GeoJSONSourceRaw,
  LineLayer,
  Marker as MapboxMarker,
  SymbolLayer
} from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'

export type MapboxMarkersStore = Record<string, MapboxMarker>
interface LinesStoreRecord {
  source: GeoJSONSourceRaw
  lineLayer: LineLayer
  symbolLayer: SymbolLayer | null
}
export type MapboxLinesStore = Record<string, LinesStoreRecord>

export const calculateDistanceSquared = (
  left: mapboxgl.Point,
  right: mapboxgl.Point
): number => {
  return (
    (left.x - right.x) * (left.x - right.x) +
    (left.y - right.y) * (left.y - right.y)
  )
}
