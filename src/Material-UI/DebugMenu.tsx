import React, { CSSProperties, ReactElement, useState } from 'react'

import IconCollapsablePanel from './IconCollapsablePanel'

import { Icon, Button, Modal, makeStyles } from '@material-ui/core'

import { SettingsInputComponent } from '@material-ui/icons'

export type ModalView = {
  text?: string
  materialIcon?: string
  fontAwesomeIcon?: string

  modalView: ReactElement<any>
}

export type Props = {
  modalViews: Array<ModalView>
}

const useStyles = makeStyles((theme) => ({
  text: theme.typography.body1,
  infoIcon: {
    display: 'inline-block',
    paddingRight: theme.spacing(),
    color: 'black'
  },
  aLink: {
    color: 'black',
    textDecoration: 'none'
  },
  modal: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    maxHeight: `calc(100vh - ${theme.spacing() * 2})` //window.innerHeight - theme.spacing() * 2
  }
}))

const renderModalViewIconContents = (modalView: ModalView) => {
  if (modalView.materialIcon) {
    return modalView.materialIcon
  }
  if (modalView.fontAwesomeIcon) {
    return <i className={`fa fa-${modalView.fontAwesomeIcon}`} />
  }
  return null
}

export const DebugMenu = (props: Props) => {
  const [openModalView, setOpenModalView] = useState<ModalView | undefined>(
    undefined
  )

  const handleClose = () => {
    setOpenModalView(undefined)
  }

  const classes = useStyles()

  const renderModal = () => {
    if (!openModalView) {
      return null
    }
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={Boolean(openModalView)}
        onClose={handleClose}
      >
        <div className={classes.modal}>{openModalView.modalView}</div>
      </Modal>
    )
  }

  const renderModalViewToggle = (modalView: ModalView) => {
    const style: CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'flex-start',
      justifyItems: 'baseline'
    }

    const openModalView = () => {
      setOpenModalView(modalView)
    }

    return (
      <span style={style}>
        <Button onClick={openModalView}>
          <Icon className={classes.infoIcon}>
            {renderModalViewIconContents(modalView)}
          </Icon>
          {modalView.text}
        </Button>
      </span>
    )
  }

  const { modalViews } = props

  const linkStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyItems: 'baseline'
  }

  return (
    <IconCollapsablePanel
      icon={(color) => {
        return <SettingsInputComponent color={color} />
      }}
      aria-label="Settings input"
    >
      <div className={classes.text}>
        Debug
        <br />
        {modalViews.map((modalView) => {
          const key = `${modalView.text ? modalView.text : ''}${
            modalView.materialIcon ? modalView.materialIcon : ''
          }${modalView.fontAwesomeIcon ? modalView.fontAwesomeIcon : ''}`
          return (
            <div key={key} style={linkStyle}>
              {renderModalViewToggle(modalView)}
            </div>
          )
        })}
        {renderModal()}
      </div>
    </IconCollapsablePanel>
  )
}

export default DebugMenu
