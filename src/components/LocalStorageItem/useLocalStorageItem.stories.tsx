import React from 'react'

import { Meta } from '@storybook/react'

import { useLocalStorageItem } from './useLocalStorageItem'

export default {
  title: 'useLocalStorageItem'
} as Meta

interface Props {
  key: string
  defaultValue?: string
  localChangeCheckSeconds?: number
}

export const Default = ({
  key,
  defaultValue = '',
  localChangeCheckSeconds = 1
}: Props) => {
  const currentValue = useLocalStorageItem({
    key,
    defaultValue,
    localChangeCheckSeconds
  })
  return (
    <>
      <div>{currentValue}</div>
      <button
        onClick={() => {
          const getValue = localStorage.getItem(key)
          if (getValue) {
            localStorage.setItem(key, getValue.split('').reverse().join(''))
          }
        }}
      >
        Reverse
      </button>
      <button
        onClick={() => {
          localStorage.removeItem(key)
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          localStorage.setItem(key, defaultValue)
        }}
      >
        Reset
      </button>
    </>
  )
}
