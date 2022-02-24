import { Point } from 'mapbox-gl'

export const calculateDistanceSquared = (left: Point, right: Point): number => {
  return (
    (left.x - right.x) * (left.x - right.x) +
    (left.y - right.y) * (left.y - right.y)
  )
}
