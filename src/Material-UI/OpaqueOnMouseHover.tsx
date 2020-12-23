import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

export type Props = {
  children: React.ReactChild | Array<React.ReactChild>
}

const useStyles = makeStyles((theme) => ({
  hide: {
    opacity: 0.2,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest
    })
  },
  show: {
    opacity: 1,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest
    })
  }
}))

const OpaqueOnMouseHover = (props: Props) => {
  const [hovered, setHovered] = React.useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const classes = useStyles()
  return (
    <div
      className={hovered ? classes.show : classes.hide}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.children}
    </div>
  )
}

export default OpaqueOnMouseHover
