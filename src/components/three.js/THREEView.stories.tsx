import React, { useEffect, useRef, useState } from 'react'

import { Meta } from '@storybook/react'

import {
  SizePropertiesDefault,
  THREEView,
  THREEViewHandlers
} from './THREEView'

import { Box2, PerspectiveCamera, Scene, Vector2 } from 'three'
import { FitWindowSize, FixedSize, SizeProperties, ViewportSize } from './Types'
import { createAxisGeometry, createBounds2DGeometry } from './Debug'

export default {
  title: 'three.js/THREEView',
  component: THREEView
} as Meta

export const DefaultSizeProperties = ({ size }: { size: SizeProperties }) => {
  var frameRequest: number = -1

  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5

  const scene = new Scene()
  scene.add(camera)

  const axis = createAxisGeometry()
  scene.add(axis)

  const bounds = createBounds2DGeometry(
    new Box2(new Vector2(-3, -3), new Vector2(3, 3))
  )
  scene.add(bounds)

  const initialValue: {
    ref: THREEViewHandlers | undefined
    threejsSetup: boolean
  } = {
    ref: undefined,
    threejsSetup: false
  }

  const ref = useRef<THREEViewHandlers>(null)
  const [threejsSetup, setThreejsSetup] = useState(false)

  const startRenders = (_threeView: THREEViewHandlers) => {
    stopRenders()

    animate()
  }

  const stopRenders = () => {
    if (frameRequest !== -1) {
      cancelAnimationFrame(frameRequest)
      frameRequest = -1
    }
  }

  const animate = () => {
    frameRequest = requestAnimationFrame(animate)

    axis.rotation.x += 0.01
    axis.rotation.y += 0.01

    if (!ref.current) {
      return
    }
    try {
      const renderer = ref.current.getRenderer()
      renderer.clear()
      renderer.render(scene, camera)
    } catch (error) {
      cancelAnimationFrame(frameRequest)
      throw error
    }
  }

  useEffect(() => {
    if (!threejsSetup || !ref.current) {
      return
    }

    startRenders(ref.current)
  }, [ref.current, threejsSetup])

  useEffect(() => {
    return stopRenders
  }, [])

  return (
    <THREEView
      ref={ref}
      size={size}
      onSetUp={() => {
        setThreejsSetup(true)
      }}
    />
  )
}
DefaultSizeProperties.args = {
  size: SizePropertiesDefault
}

export const FixedSizeProperties = ({
  width,
  height
}: {
  width: number
  height: number
}) => {
  const fixedSize: FixedSize = {
    kind: 'FixedSize',
    width,
    height
  }
  return DefaultSizeProperties({ size: fixedSize })
}
FixedSizeProperties.args = {
  width: 10,
  height: 10
}

export const ViewPortSizeProperties = ({
  viewportSize
}: {
  viewportSize: number
}) => {
  const viewportSizeProperty: ViewportSize = {
    kind: 'ViewportSize',
    viewportSize
  }
  return DefaultSizeProperties({ size: viewportSizeProperty })
}
ViewPortSizeProperties.args = {
  viewportSize: 10
}

export const FitWindowSizeProperties = ({
  pixelsPerWindowPixel,
  resizeRendererToFit
}: {
  pixelsPerWindowPixel: number
  resizeRendererToFit: boolean
}) => {
  const size: FitWindowSize = {
    kind: 'FitWindowSize',
    pixelsPerWindowPixel,
    resizeRendererToFit
  }
  return DefaultSizeProperties({ size })
}
FitWindowSizeProperties.args = {
  pixelsPerWindowPixel: 1,
  resizeRendererToFit: true
}
