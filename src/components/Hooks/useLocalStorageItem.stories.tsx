import React from 'react'

import { Meta } from '@storybook/react/types-6-0'

import { useLocalStorageItem } from './useLocalStorageItem'

export default {
  title: 'Hooks/useLocalStorageItem'
} as Meta

interface Props {
  key: string
  defaultValue?: string | null
  localChangeCheckSeconds?: number | undefined
}

export const Default = ({
  key,
  defaultValue,
  localChangeCheckSeconds
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
Default.args = {
  key: 'item1',
  defaultValue: 'value1',
  localChangeCheckSeconds: 1
}
