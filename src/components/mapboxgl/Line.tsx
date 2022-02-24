import { GeoJSON } from 'geojson'
import { Expression, GeoJSONSource, GeoJSONSourceRaw } from 'mapbox-gl'
import React, { useContext, useEffect, useState } from 'react'
import { MapContext } from './Utility/MapContext'

export interface Coordinates {
  longitude: number
  latitude: number
}

export interface Props {
  id: string

  points: Array<Coordinates>

  color: string

  lineOffset?: number | Expression | undefined
  lineWidth: number | Expression
  lineOpacity?: number | undefined
  lineOpacityLoadDuration?: number | undefined
  linePattern?: string | undefined

  textSymbol?: string | Expression | undefined
  textSize?: number | Expression | undefined
  textSpacing?: number | Expression | undefined
  textKeepUpright?: boolean | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const createLineSourceFeatureId = (id: string) => `line-all`
const createLineLayerId = (id: string) => `line-${id}`
const createLineSymbolLayerId = (id: string) => `line-symbol-${id}`

export const Line = ({
  id,
  points,
  color,
  lineOffset,
  lineWidth,
  lineOpacity,
  lineOpacityLoadDuration,
  linePattern,
  textSymbol,
  textSize,
  textSpacing,
  textKeepUpright
}: Props): React.ReactElement => {
  const context = useContext(MapContext)
  const { map, mapStyleIsDoneLoading } = context
  const [hasSetInitialShow, setHasSetInitialShow] = useState(false)
  const [waitingOnLinePattern, setWaitingOnLinePattern] = useState(true)

  useEffect(() => {
    if (!map || !mapStyleIsDoneLoading) {
      return
    }

    const previousSource = map.getSource(id)
    if (previousSource) {
      map.removeSource(id)
    }
    const source: GeoJSONSourceRaw = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    }
    map.addSource(id, source)

    const lineLayerId = createLineLayerId(id)

    map.addLayer({
      id: lineLayerId,
      type: 'line',
      source: id,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      }
    })

    const lineSymbolLayerId = createLineSymbolLayerId(id)
    if (textSymbol) {
      map.addLayer({
        id: lineSymbolLayerId,
        type: 'symbol',
        source: id,
        layout: {
          'symbol-placement': 'line'
        }
      })
    }

    return () => {
      if (textSymbol) {
        map.removeLayer(lineSymbolLayerId)
      }
      map.removeLayer(lineLayerId)

      map.removeSource(id)
    }
  }, [id, map, mapStyleIsDoneLoading, textSymbol])

  useEffect(() => {
    if (!map || !mapStyleIsDoneLoading) {
      return
    }

    const mapboxSource = map.getSource(id) as GeoJSONSource

    const validPoints = Array.isArray(points)
    const data:
      | string
      | GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>
      | GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties> =
      {
        type: 'FeatureCollection',
        features: validPoints
          ? [
              {
                type: 'Feature',
                properties: {
                  id: createLineSourceFeatureId(id)
                },
                geometry: {
                  type: 'LineString',
                  coordinates: points.map((point) => [
                    point.longitude,
                    point.latitude
                  ])
                }
              }
            ]
          : []
      }
    // const source: GeoJSONSourceRaw = {
    //   type: 'geojson',
    //   data
    // }
    mapboxSource.setData(data)
  }, [id, map, mapStyleIsDoneLoading, points])

  useEffect(() => {
    if (!map || !mapStyleIsDoneLoading) {
      return
    }

    const lineLayerId = createLineLayerId(id)

    if (linePattern) {
      if (map.hasImage(linePattern)) {
        map.setPaintProperty(lineLayerId, 'line-pattern', linePattern)

        setWaitingOnLinePattern(false)
      } else {
        setWaitingOnLinePattern(true)

        map.loadImage(linePattern, (error, image) => {
          if (error) {
            console.log(
              'While loading line pattern image',
              linePattern,
              ':',
              error
            )
            throw error
          }

          if (!image) {
            console.log(
              'While loading line pattern image',
              linePattern,
              ':',
              'image is null'
            )
            throw new Error('image is null')
          }

          map.addImage(linePattern, image)
          map.setPaintProperty(lineLayerId, 'line-pattern', linePattern)

          setWaitingOnLinePattern(false)
        })
      }
    }
  }, [id, linePattern, map, mapStyleIsDoneLoading])

  useEffect(() => {
    if (!map || !mapStyleIsDoneLoading) {
      return
    }

    const lineLayerId = createLineLayerId(id)

    map.setPaintProperty(lineLayerId, 'line-offset', lineOffset)
    map.setPaintProperty(lineLayerId, 'line-color', color)
    map.setPaintProperty(lineLayerId, 'line-width', lineWidth)
    map.setPaintProperty(
      lineLayerId,
      'line-opacity-transition',
      lineOpacityLoadDuration
        ? { duration: lineOpacityLoadDuration }
        : undefined
    )
  }, [
    color,
    id,
    lineOffset,
    lineOpacityLoadDuration,
    lineWidth,
    map,
    mapStyleIsDoneLoading
  ])

  useEffect(() => {
    if (!map || !mapStyleIsDoneLoading) {
      return
    }
    if (!textSymbol) {
      return
    }

    const lineSymbolLayerId = createLineSymbolLayerId(id)

    map.setLayoutProperty(lineSymbolLayerId, 'text-field', textSymbol)
    map.setLayoutProperty(lineSymbolLayerId, 'text-size', textSize)
    map.setLayoutProperty(lineSymbolLayerId, 'symbol-spacing', textSpacing)
    map.setLayoutProperty(
      lineSymbolLayerId,
      'text-keep-upright',
      textKeepUpright
    )

    map.setPaintProperty(lineSymbolLayerId, 'text-color', color)
    map.setPaintProperty(
      lineSymbolLayerId,
      'text-opacity-transition',
      lineOpacityLoadDuration
        ? { duration: lineOpacityLoadDuration }
        : undefined
    )
    // 'text-halo-color': 'hsl(55, 11%, 96%)',
    // 'text-halo-width': 3,
  }, [
    color,
    id,
    lineOpacityLoadDuration,
    map,
    mapStyleIsDoneLoading,
    textKeepUpright,
    textSize,
    textSpacing,
    textSymbol
  ])

  useEffect(() => {
    if (!map || !mapStyleIsDoneLoading) {
      return
    }

    const lineLayerId = createLineLayerId(id)

    const useOpacity = (() => {
      if (!lineOpacityLoadDuration || lineOpacityLoadDuration <= 0) {
        if (waitingOnLinePattern) {
          return 0
        }

        return lineOpacity
      }

      if (!hasSetInitialShow) {
        return 0
      }
      return lineOpacity
    })()

    map.setPaintProperty(lineLayerId, 'line-opacity', useOpacity)

    if (textSymbol) {
      const lineSymbolLayerId = createLineSymbolLayerId(id)

      map.setPaintProperty(lineSymbolLayerId, 'text-opacity', useOpacity)
    }

    if (!hasSetInitialShow && !waitingOnLinePattern) {
      setTimeout(() => {
        setHasSetInitialShow(true)
      }, 500) // MapboxGL hack, TODO: find out why it would take this long to process and how we can make sure we're ready
    }
  }, [
    hasSetInitialShow,
    id,
    lineOpacity,
    lineOpacityLoadDuration,
    map,
    mapStyleIsDoneLoading,
    textSymbol,
    waitingOnLinePattern
  ])

  return <></>
}

export default Line
