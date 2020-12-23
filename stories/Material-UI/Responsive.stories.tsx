import React, {} from 'react'

import { Meta } from '@storybook/react/types-6-0'

import { MaterialUI } from '../../src/'
const { Responsive, Desktop, Tablet, Mobile } = MaterialUI

export default {
  title: 'Material-UI/Responsive',
  component: Responsive
} as Meta

export const DesktopTabletMobile = () => {
  return (
    <div style={{ width: '100%' }}>
      <Desktop>Nice Desktop</Desktop>
      <Tablet>Oooo sleek Tablet</Tablet>
      <Mobile>You jetsetter you, always Mobile</Mobile>
    </div>
  )
}
