// TODO: make work in `eunomia-typescript`

import React from 'react'

import { Meta } from '@storybook/react/types-6-0';

import useLocalStorageItem from '../../src/Hooks/useLocalStorageItem'
import { Button } from '@material-ui/core';

export default {
  title: 'Hooks/useLocalStorageItem',
} as Meta

export const Default = ({ key, defaultValue, localChangeCheckSeconds }: { key: string, defaultValue?: string | null, localChangeCheckSeconds?: number | undefined }) => {
    const currentValue = useLocalStorageItem({
        key,
        defaultValue,
        localChangeCheckSeconds
    })
    return <React.Fragment>
        <div>{currentValue}</div>
        <Button onClick={() => {
            const getValue = localStorage.getItem(key)
            if (getValue) {
                localStorage.setItem(key, getValue.split("").reverse().join(""))
            }
        }}>Reverse</Button>
        <Button onClick={() => {
            localStorage.removeItem(key)
        }}>Clear</Button>
    </React.Fragment>
}
Default.args = {
    key: 'item1',
    defaultValue: 'value1',
    localChangeCheckSeconds: 1
}