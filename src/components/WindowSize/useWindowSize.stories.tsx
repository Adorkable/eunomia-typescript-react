import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { useWindowSize } from './useWindowSize'

export default {
  title: 'WindowSize/useWindowSize'
} as Meta

export const Default = () => {
  const { width, height } = useWindowSize()
  return (
    <>
      <div>Window Width: {width}px</div>
      <div>Window Height: {height}px</div>
    </>
  )
}
