import mapboxgl from 'mapbox-gl'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import ReactDOM from 'react-dom'
import { MapContext } from './Utility/MapContext'

export interface Coordinates {
  longitude: number
  latitude: number
}

export interface Props {
  location: Coordinates
  popup?: React.ReactElement | undefined
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: MouseEvent) => void
  children?: React.ReactElement | undefined
}

export interface MarkerMethods {
  getLocation: () => Coordinates
  isCollidable: () => boolean
  getMapboxMarker: () => React.MutableRefObject<mapboxgl.Marker>
}

export const Marker = ({ location, popup, onClick, children }: Props) => {
  const context = useContext(MapContext)
  const { map } = context

  const [childrenContainer, setChildrenContainer] = useState<
    HTMLDivElement | undefined
  >(undefined)
  const mapboxMarker = useRef<mapboxgl.Marker>()
  const [markerHover, setMarkerHover] = useState(false)

  const [popupContainer, setPopupContainer] = useState<
    HTMLDivElement | undefined
  >(undefined)
  const mapboxPopup = useRef<mapboxgl.Popup>()
  const [popupHover, setPopupHover] = useState(false)

  const onMouseEnterMarker = useCallback(() => {
    setMarkerHover(true)
  }, [])
  const onMouseLeaveMarker = useCallback(() => {
    setMarkerHover(false)
  }, [])

  const onMouseEnterPopup = useCallback(() => {
    setPopupHover(true)
  }, [])
  const onMouseLeavePopup = useCallback(() => {
    setPopupHover(false)
  }, [])

  /**
   * Create / Destroy Mapbox Marker
   */
  useEffect(() => {
    const newContainer = document.createElement('div')
    newContainer.style.cursor = 'initial'
    setChildrenContainer(newContainer)

    mapboxMarker.current = new mapboxgl.Marker(newContainer)
    mapboxMarker.current.setLngLat([0, 0]) // Must be initialize with a location, otherwise Mapbox freaks

    const markerElement = mapboxMarker.current.getElement() as HTMLElement
    if (markerElement) {
      markerElement.addEventListener('mouseenter', onMouseEnterMarker)
      markerElement.addEventListener('mouseleave', onMouseLeaveMarker)

      if (onClick) {
        markerElement.onclick = (event) => {
          onClick(event)
        }
      }
    }

    return () => {
      if (!mapboxMarker.current) {
        return
      }

      const markerElement = mapboxMarker.current.getElement() as HTMLElement
      if (markerElement) {
        markerElement.removeEventListener('mouseenter', onMouseEnterMarker)
        markerElement.removeEventListener('mouseleave', onMouseLeaveMarker)
      }

      mapboxMarker.current.remove()
      mapboxMarker.current = undefined
    }
  }, [onClick, onMouseEnterMarker, onMouseLeaveMarker])

  useEffect(() => {
    if (!childrenContainer) {
      return
    }

    if (children) {
      ReactDOM.render(children, childrenContainer)
    } else {
      childrenContainer.innerHTML = ''
    }
  }, [childrenContainer, children])

  /**
   * Create / Destroy Mapbox Popup
   */
  useEffect(() => {
    if (!mapboxMarker.current) {
      console.log('Not popup')
      return
    }

    const newContainer = document.createElement('div')
    setPopupContainer(newContainer)

    mapboxPopup.current = new mapboxgl.Popup({
      closeOnClick: false,
      closeButton: false,
      focusAfterOpen: false
    })
    mapboxPopup.current.setDOMContent(newContainer)

    mapboxMarker.current.setPopup(mapboxPopup.current)

    return () => {
      if (!mapboxMarker.current) {
        return
      }
      mapboxMarker.current.setPopup()
    }
  }, [])

  useEffect(() => {
    if (!popupContainer) {
      return
    }

    if (popup) {
      ReactDOM.render(popup, popupContainer)
    } else {
      popupContainer.innerHTML = ''
    }
  }, [popupContainer, popup])

  useEffect(() => {
    const mapboxMarkerInstance = mapboxMarker.current
    if (!mapboxMarkerInstance) {
      return
    }

    const markerPopup = mapboxMarkerInstance.getPopup()
    if (markerHover || popupHover) {
      if (!markerPopup.isOpen()) {
        mapboxMarkerInstance.togglePopup()
        const popupElement = mapboxMarkerInstance.getElement()
        if (popupElement) {
          popupElement.addEventListener('mouseenter', onMouseEnterPopup)
          popupElement.addEventListener('mouseleave', onMouseLeavePopup)
        }
      }
    } else {
      const mapboxMarkerInstance = mapboxMarker.current
      if (!mapboxMarkerInstance) {
        return
      }

      if (markerPopup.isOpen()) {
        mapboxMarkerInstance.togglePopup()
        const popupElement = mapboxMarkerInstance.getElement()
        if (popupElement) {
          popupElement.removeEventListener('mouseenter', onMouseEnterPopup)
          popupElement.removeEventListener('mouseleave', onMouseLeavePopup)
        }
      }
    }
  }, [markerHover, onMouseEnterPopup, onMouseLeavePopup, popupHover])

  const mapboxMarkerOnClick = useCallback<mapboxgl.EventedListener>(
    (event) => {
      if (onClick) {
        onClick(event as MouseEvent)
      }
    },
    [onClick]
  )

  useEffect(() => {
    if (!mapboxMarker.current) {
      return
    }
    mapboxMarker.current.on('click', mapboxMarkerOnClick)
    return () => {
      if (!mapboxMarker.current) {
        return
      }
      mapboxMarker.current.off('click', mapboxMarkerOnClick)
    }
  }, [onClick])

  useEffect(() => {
    if (!map || !mapboxMarker.current) {
      return
    }

    mapboxMarker.current.addTo(map)

    return () => {
      if (mapboxMarker.current) {
        mapboxMarker.current.remove()
      }
    }
  }, [map])

  useEffect(() => {
    if (!mapboxMarker.current) {
      return
    }
    mapboxMarker.current.setLngLat([location.longitude, location.latitude])
  }, [location])

  useEffect(() => {
    if (childrenContainer && children) {
      ReactDOM.render(children, childrenContainer)
    }
  }, [children, childrenContainer])

  return <></>
}

export default Marker
