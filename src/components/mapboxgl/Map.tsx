import mapboxgl, { LngLat } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import Line from './Line'
import LocationInformationDialog from './LocationInformationDialog'
import { MarkerMethods } from './Marker'
import { MinMax } from './Utility/LngLat'
import { MapContext } from './Utility/MapContext'

interface Props {
  accessToken: string

  longitude: number
  longitudeMinMax?: MinMax
  latitude: number
  latitudeMinMax?: MinMax

  zoom: number
  zoomMinMax?: MinMax

  style?: string | undefined

  showLocation?: boolean
  children?:
    | React.ReactElement<MarkerMethods | typeof Line>
    | Array<React.ReactElement<MarkerMethods | typeof Line>>
    | undefined
}

export const Map = ({
  accessToken,
  longitude: startingLongitude,
  longitudeMinMax,
  latitude: startingLatitude,
  latitudeMinMax,
  zoom: startingZoom,
  zoomMinMax,
  style = 'mapbox://styles/mapbox/streets-v11',
  showLocation = false,
  children
}: Props): React.ReactElement => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map: MutableRefObject<mapboxgl.Map | null> =
    useRef<mapboxgl.Map | null>(null)
  const [longitude, setLongitude] = useState(startingLongitude)
  const [latitude, setLatitude] = useState(startingLatitude)
  const [zoom, setZoom] = useState(startingZoom)
  const [mapStyleIsLoaded, setMapStyleIsLoaded] = useState(false)
  const [mouseLocation, setMouseLocation] = useState<LngLat | undefined>()
  const [mouseLocationPause, setMouseLocationPause] = useState(false)
  // const [markers, setMarkers] = useState<MarkersStore>({})
  // TODO: only allows for one instance of a map, fix for future usage
  mapboxgl.accessToken = accessToken

  useEffect(() => {
    // TODO: deinitialize map when unmounting
    // TODO: deinitialize map when accessToken changes
    // TODO: deinitialize map when style changes

    if (map.current) {
      return
    } // initialize map only once

    if (!mapContainer.current) {
      return
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      center: [longitude, latitude],
      zoom: zoom,
      minZoom: zoomMinMax ? zoomMinMax.minimum : undefined,
      maxZoom: zoomMinMax ? zoomMinMax.maximum : undefined,
      maxBounds:
        longitudeMinMax && latitudeMinMax
          ? [
              [longitudeMinMax.minimum, latitudeMinMax.minimum],
              [longitudeMinMax.maximum, latitudeMinMax.maximum]
            ]
          : undefined
    })
  })

  const onClick = useCallback(() => {
    setMouseLocationPause(!mouseLocationPause)
  }, [mouseLocationPause])

  const onMapMove = useCallback(() => {
    if (!map.current) {
      return
    }
    const newLngLat = map.current.getCenter()
    setLongitude(newLngLat.lng)
    setLatitude(newLngLat.lat)
    setZoom(map.current.getZoom()) // Zoom is clamped in map construction
  }, [])

  useEffect(() => {
    if (!map.current) {
      return
    }
    map.current.setCenter([longitude, startingLatitude])
  }, [startingLatitude])

  useEffect(() => {
    if (!map.current) {
      return
    }
    map.current.setCenter([startingLongitude, latitude])
  }, [startingLongitude])

  useEffect(() => {
    if (!map.current) {
      return
    }
    map.current.setZoom(startingZoom)
  }, [startingZoom])

  useEffect(() => {
    if (!map.current) {
      return
    }

    if (zoomMinMax) {
      map.current.setMinZoom(zoomMinMax.minimum)
      map.current.setMaxZoom(zoomMinMax.maximum)
    } else {
      map.current.setMinZoom()
      map.current.setMaxZoom()
    }
  }, [zoomMinMax])

  const onMouseMove = useCallback(
    (event) => {
      if (mouseLocationPause) {
        return
      }
      setMouseLocation(event.lngLat)
    },
    [mouseLocationPause]
  )

  const onMapLoad = useCallback(() => {
    setMapStyleIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!map.current) {
      return
    }

    map.current.on('move', onMapMove)
    return () => {
      if (!map.current) {
        return
      }
      map.current.off('move', onMapMove)
    }
  }, [onMapMove])

  useEffect(() => {
    if (!map.current) {
      return
    }

    map.current.on('mousemove', onMouseMove)
    return () => {
      if (!map.current) {
        return
      }
      map.current.off('mousemove', onMouseMove)
    }
  }, [onMouseMove])

  useEffect(() => {
    if (!map.current) {
      return
    }

    map.current.on('click', onClick)
    return () => {
      if (!map.current) {
        return
      }
      map.current.off('click', onClick)
    }
  }, [onClick])

  useEffect(() => {
    if (!map.current) {
      return
    }

    map.current.on('load', onMapLoad)
    return () => {
      if (!map.current) {
        return
      }
      map.current.off('load', onMapLoad)
    }
  }, [onMapLoad])

  // TODO: extract location information from below, make most customizable
  // TODO: map style more customizable
  return (
    <div style={{ position: 'relative', maxHeight: '100%', height: '100vh' }}>
      {showLocation ? (
        <LocationInformationDialog
          longitude={longitude}
          latitude={latitude}
          zoom={zoom}
          showMouse
          mouseLongitude={mouseLocation ? mouseLocation.lng : 0}
          mouseLatitude={mouseLocation ? mouseLocation.lat : 0}
          showForCode
        />
      ) : null}
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: '100%' }}
      />
      <MapContext.Provider
        value={{
          map: map.current,
          mapStyleIsDoneLoading: mapStyleIsLoaded
        }}
      >
        {children}
      </MapContext.Provider>
    </div>
  )
}

export default Map
