import React from 'react'

import { Meta } from '@storybook/react/types-6-0'

import { Map } from './Map'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MinMax } from './Utility/LngLat'

export default {
  title: 'mapboxgl/Map'
} as Meta

interface Props {
  accessToken: string

  latitude: number
  longitude: number
  latitudeMinMax?: MinMax
  longitudeMinMax?: MinMax

  zoom: number
  zoomMinMax?: MinMax

  style?: string | undefined
  showLocation?: boolean
}

export const Default = ({
  accessToken,
  latitude,
  longitude,
  latitudeMinMax,
  longitudeMinMax,
  zoom,
  zoomMinMax,
  style,
  showLocation
}: Props) => {
  return (
    <Map
      accessToken={accessToken}
      latitude={latitude}
      longitude={longitude}
      latitudeMinMax={latitudeMinMax}
      longitudeMinMax={longitudeMinMax}
      zoom={zoom}
      zoomMinMax={zoomMinMax}
      style={style}
      showLocation={showLocation}
    ></Map>
  )
}

Default.args = {
  accessToken: process.env.MAPBOXGL_ACCESS_TOKEN,
  latitude: 40.71,
  longitude: -73.93,
  latitudeMinMax: undefined,
  longitudeMinMax: undefined,
  zoom: 5,
  zoomMinMax: undefined,
  style: undefined,
  showLocation: false
}
