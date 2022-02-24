import { LngLat } from 'mapbox-gl'
import { clamp } from '@adorkable/eunomia-typescript'
import { Coordinates } from '../Marker'

export interface MinMax {
  minimum: number
  maximum: number
}

export const clampLngLat = (
  lngLat: LngLat,
  longitudeMinMax?: MinMax | undefined,
  latitudeMinMax?: MinMax | undefined
): LngLat => {
  let clampedLongitude: number
  if (longitudeMinMax) {
    clampedLongitude = clamp(lngLat.lng, longitudeMinMax.minimum, longitudeMinMax.maximum)
  } else {
    clampedLongitude = lngLat.lng
  }

  let clampedLatitude: number
  if (latitudeMinMax) {
    clampedLatitude = clamp(lngLat.lat, latitudeMinMax.minimum, latitudeMinMax.maximum)
  } else {
    clampedLatitude = lngLat.lat
  }

  return new LngLat(clampedLongitude, clampedLatitude)
}

export const coordinatesToLngLat = (coordinates: Coordinates): LngLat => {
  return new LngLat(coordinates.longitude, coordinates.latitude)
}
