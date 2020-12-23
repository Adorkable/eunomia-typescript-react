import React, { ReactNode, useEffect, useState } from 'react'

import { Meta } from '@storybook/react/types-6-0'

import { MaterialUI } from '../../src/'
const { SliderView } = MaterialUI

export default {
  title: 'Material-UI/SliderView',
  component: SliderView
} as Meta

interface StateHolderProps<ValueType> {
  initialValue: ValueType

  child: (
    value: ValueType,
    setValue: (newValue: ValueType) => void
  ) => ReactNode
}

const StateHolder = <ValueType extends any>(
  props: StateHolderProps<ValueType>
) => {
  const { initialValue } = props
  const [value, setValue] = useState<ValueType>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <div>{props.child(value, setValue)}</div>
}

export const Default = ({ minimum, maximum, value }) => {
  return (
    <StateHolder
      child={(value, setValue) => {
        return (
          <SliderView
            value={value}
            minimum={minimum}
            maximum={maximum}
            onChange={setValue}
          />
        )
      }}
      initialValue={value}
    />
  )
}
Default.args = {
  minimum: 0,
  maximum: 100,
  value: 25
}
