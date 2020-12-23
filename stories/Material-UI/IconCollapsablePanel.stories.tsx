import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0';

import IconCollapsablePanel, { Props } from '../../src/Material-UI/IconCollapsablePanel'

import { Info } from '@material-ui/icons'

export default {
  title: 'Material-UI/IconCollapsablePanel',
  component: IconCollapsablePanel,
} as Meta;


export const Default = () => {
    return (
        <IconCollapsablePanel
      icon={(color) => {
        return <Info color={color} />
      }}
      aria-label="Info"
    >
        Panel Contents
    </IconCollapsablePanel>
    )
}