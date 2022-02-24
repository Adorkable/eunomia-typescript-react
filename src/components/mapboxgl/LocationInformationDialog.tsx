import React from 'react'

interface Props {
  longitude: number
  latitude: number
  zoom: number

  showMouse: boolean
  mouseLongitude: number
  mouseLatitude: number

  showForCode: boolean
}

export const LocationInformationDialog = ({
  longitude,
  latitude,
  zoom,
  showMouse,
  mouseLongitude,
  mouseLatitude,
  showForCode
}: Props): React.ReactElement => {
  return (
    <div
      className="sidebar"
      style={{
        backgroundColor: 'rgba(35, 55, 75, 0.9)',
        color: '#fff',
        padding: '6px 12px',
        fontFamily: 'monospace',
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 12,
        borderRadius: 4
      }}
    >
      <div>
        <div>
          Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
        </div>
        <div>
          {showForCode
            ? `- {"longitude": ${longitude}, "latitude": ${latitude}}`
            : null}
        </div>
      </div>
      {showMouse ? (
        <div>
          <div>
            Mouse ~ Longitude: {mouseLongitude} | Latitude: {mouseLatitude}
          </div>
          <div>
            {showForCode
              ? `- {"longitude": ${mouseLongitude}, "latitude": ${mouseLatitude}}`
              : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default LocationInformationDialog
