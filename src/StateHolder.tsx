import React, { Fragment, ReactNode, useEffect, useState } from 'react'

export interface Props<ValueType> {
  initialValue: ValueType

  child: (
    value: ValueType,
    setValue: (newValue: ValueType) => void
  ) => ReactNode
}

export const StateHolder = <ValueType extends any>(props: Props<ValueType>) => {
  const { initialValue } = props
  const [value, setValue] = useState<ValueType>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <Fragment>{props.child(value, setValue)}</Fragment>
}

export default StateHolder
