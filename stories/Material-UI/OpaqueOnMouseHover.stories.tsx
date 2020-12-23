import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0';

import OpaqueOnMouseHover from '../../src/Material-UI/OpaqueOnMouseHover'

export default {
  title: 'Material-UI/OpaqueOnMouseHover',
  component: OpaqueOnMouseHover,
} as Meta;

export const OneChild = () => {
    return (
        <OpaqueOnMouseHover>
            This is a test
        </OpaqueOnMouseHover>
    )
}

export const ManyChildren = () => {
    return (
        <OpaqueOnMouseHover>
            This is a test
            <div>I'm inna divvv</div>
            <span>I'm inna span</span>
        </OpaqueOnMouseHover>
    )
}