import React, { ChangeEvent } from 'react'

import Typography from '@material-ui/core/Typography'
import MaterialSlider from '@material-ui/core/Slider'

export type Props = {
  value: number

  minimum: number
  maximum: number

  onChange: (newValue: number) => void
}

export const SliderView = (props: Props) => {
  const { value, minimum, maximum, onChange } = props

  const onChangeWrapper = (
    _event: ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      onChange(newValue[0]) // TODO: what should we do about array value??
    } else {
      onChange(newValue)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography>{value.toFixed(2)}</Typography>
      <MaterialSlider
        value={value}
        min={minimum}
        max={maximum}
        onChange={onChangeWrapper}
      />
    </div>
  )
}

export default SliderView
