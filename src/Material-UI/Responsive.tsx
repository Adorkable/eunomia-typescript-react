import React, { Fragment, ReactChild } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import json2mq from 'json2mq'

export type OptionalRenderingChildren =
  | ReactChild
  | Array<ReactChild>
  | (() => ReactChild | Array<ReactChild>)

export type ResponsiveProps = {
  minWidth?: number | string
  maxWidth?: number | string

  children: OptionalRenderingChildren
}

export const Responsive = (props: ResponsiveProps) => {
  const match = useMediaQuery(
    json2mq({
      minWidth: props.minWidth || false,
      maxWidth: props.maxWidth || false
    })
  )
  if (match) {
    let children: ReactChild | Array<ReactChild>
    if (typeof props.children === 'function') {
      children = props.children()
    } else {
      children = props.children
    }
    return <Fragment>{children}</Fragment>
  }
  return null
}

export type Props = {
  children: OptionalRenderingChildren
}

export const Desktop = (props: Props) => (
  <Responsive minWidth={1025} children={props.children} />
)

export const Tablet = (props: Props) => (
  <Responsive minWidth={768} maxWidth={1024} children={props.children} />
)

export const Mobile = (props: Props) => (
  <Responsive maxWidth={767} children={props.children} />
)

export default Responsive
