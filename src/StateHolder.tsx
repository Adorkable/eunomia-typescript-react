import React from 'react'

export interface Props<ValueType> {
    initialValue: ValueType

    child: (value: ValueType, setValue: (newValue: ValueType) => void) => React.ReactNode
}

export const StateHolder = <ValueType extends any>(props: Props<ValueType>) => {
    const { initialValue } = props
    const [value, setValue] = React.useState<ValueType>(initialValue)
    
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

        return <React.Fragment>
            {props.child(value, setValue)}
        </React.Fragment>
}

export default StateHolder