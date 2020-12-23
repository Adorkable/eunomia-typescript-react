import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0';

import DebugMenu, { ModalView } from '../../src/Material-UI/DebugMenu'
import { Typography } from '@material-ui/core';

export default {
  title: 'Material-UI/DebugMenu',
  component: DebugMenu,
} as Meta;

export const Default = () => {
    const debugViews = [
        {
            text: 'Frist',
            materialIcon: 'bubble_chart',
            modalView: <Typography>Asdf</Typography>
        },
        {
            text: 'SEcnD',
            materialIcon: 'linear_scale',
            modalView: <Typography>Asdf Also</Typography>
        },
        {
            text: 'Turd',
            materialIcon: 'polymer',
            modalView: <Typography>Oy</Typography>
        }
    ]

    return <DebugMenu modalViews={debugViews}/>
}