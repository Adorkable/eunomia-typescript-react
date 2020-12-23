import React, { ReactChild, useState } from 'react'

import OpaqueOnMouseHover from './OpaqueOnMouseHover'

import { Card, CardContent, CardActions, makeStyles } from '@material-ui/core'

// import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

import Collapse from '@material-ui/core/Collapse'

export type Props = {
  'aria-label': string
  icon: (
    color: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error'
  ) => ReactChild

  children: ReactChild | Array<ReactChild>
}

const useStyles = makeStyles((theme) => ({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing()
  },
  Contents: {
    display: 'flex',
    flexDirection: 'column'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  CollapsedContent: {
    padding: theme.spacing()
  }
}))

export const IconCollapsablePanel = (props: Props) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandToggled = () => {
    setExpanded(!expanded)
  }

  const classes = useStyles()

  const renderExpandToggle = () => {
    const { icon } = props
    const ariaLabel = props['aria-label']

    const expandToggleColor = expanded ? 'primary' : 'inherit'

    return (
      <IconButton aria-label={ariaLabel} onClick={handleExpandToggled}>
        {icon(expandToggleColor)}
      </IconButton>
    )
  }

  return (
    <OpaqueOnMouseHover>
      <Card className={classes.Container}>
        <CardContent
          className={classes.Contents}
          style={{
            padding: 0
          }}
        >
          <Collapse
            className={classes.CollapsedContent}
            // transitionDuration='auto'
            in={expanded}
            unmountOnExit
          >
            {props.children}
          </Collapse>
        </CardContent>
        <CardActions
          style={{
            padding: 0
          }}
        >
          {renderExpandToggle()}
        </CardActions>
      </Card>
    </OpaqueOnMouseHover>
  )
}

export default IconCollapsablePanel
