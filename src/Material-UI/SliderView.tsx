import React from 'react'

import Typography from '@material-ui/core/Typography'
import MaterialSlider from '@material-ui/core/Slider'

// import 'rc-slider/assets/index.css'
// import RCSlider from 'rc-slider'

type Props = {
  value: number

  minimum: number
  maximum: number

  onChange: (newValue: number) => void
}

export const SliderView = (props: Props) => {
  const { value, minimum, maximum, onChange } = props

  const onChangeWrapper = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onChange(newValue[0]) // TODO: what should we do about array value??
    } else {
      onChange(newValue)
    }
  }

  // const marks = [
  //   {
  //     value:
  //   }
  // ]
  // marks[`${minimum}`] = minimum
  // marks[`${maximum}`] = maximum

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
        // marks={marks}
        onChange={onChangeWrapper}
      />
    </div>
  )
}

export default SliderView
