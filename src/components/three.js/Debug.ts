// TODO: this can exist in `eunomia-typescript`
import {
  Group,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Box2,
  WebGLRenderer,
  Scene
} from 'three'

export const createAxisGeometry = (): Group => {
  const boxGeometry = new BoxGeometry()

  const redMaterial = new MeshBasicMaterial({ color: 0xff0000 })
  const greenMaterial = new MeshBasicMaterial({ color: 0x00ff00 })
  const blueMaterial = new MeshBasicMaterial({ color: 0x0000ff })

  const x = new Mesh(boxGeometry, redMaterial)
  x.position.x = 0.5
  x.scale.y = 0.1
  x.scale.z = 0.1

  const y = new Mesh(boxGeometry, greenMaterial)
  y.position.y = 0.5
  y.scale.x = 0.1
  y.scale.z = 0.1

  const z = new Mesh(boxGeometry, blueMaterial)
  z.position.z = 0.5
  z.scale.x = 0.1
  z.scale.y = 0.1

  const result = new Group()
  result.add(x)
  result.add(y)
  result.add(z)
  return result
}

export const createBounds2DGeometry = (bounds: Box2): Group => {
  const topLeft = createAxisGeometry()
  topLeft.position.x = bounds.min.x
  topLeft.position.y = bounds.min.y

  const topRight = createAxisGeometry()
  topRight.position.x = bounds.max.x
  topRight.position.y = bounds.min.y

  const bottomLeft = createAxisGeometry()
  bottomLeft.position.x = bounds.min.x
  bottomLeft.position.y = bounds.max.y

  const bottomRight = createAxisGeometry()
  bottomRight.position.x = bounds.max.x
  bottomRight.position.y = bounds.max.y

  const result = new Group()
  result.add(topLeft)
  result.add(topRight)
  result.add(bottomLeft)
  result.add(bottomRight)
  return result
}

// eslint-disable-next-line @typescript-eslint/ban-types
declare let setupThreejsDevTool: Function | void

export const attachThreejsDevTool = (
  renderer: WebGLRenderer,
  scene: Scene,
  THREE: any
) => {
  if (typeof setupThreejsDevTool === 'function') {
    setupThreejsDevTool({
      renderer,
      scene,
      THREE
    })
  } else {
    throw new Error('setupThreejsDevTool is not a function')
  }
}
