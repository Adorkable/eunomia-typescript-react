import { Map } from 'mapbox-gl'
import { createContext } from 'react'

interface Context {
  map: Map | null
  mapStyleIsDoneLoading: boolean
}

export const MapContext = createContext<Context>({
  map: null,
  mapStyleIsDoneLoading: false
})
