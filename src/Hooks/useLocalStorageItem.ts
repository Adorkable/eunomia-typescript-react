// TODO: mostly untested :P
import { useEffect, useState } from 'react'

interface Props {
  key: string

  defaultValue?: string | null

  localChangeCheckSeconds?: number | undefined
  onChange?: ((newValue: string | null) => void) | undefined
}

export const useLocalStorageItem = (props: Props) => {
  const { key, defaultValue, localChangeCheckSeconds, onChange } = props

  const [currentValue, setCurrentValue] = useState<string | null>(
    localStorage.getItem(key)
  )

  useEffect(() => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, defaultValue || '')
    }
  }, [key])

  useEffect(() => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, defaultValue || '')
    }
  }, [defaultValue])

  useEffect(() => {
    if (onChange) {
      onChange(currentValue)
    }
  }, [currentValue])

  useEffect(() => {
    const checkChange = () => {
      const checkValue = localStorage.getItem(key)
      if (checkValue !== currentValue) {
        setCurrentValue(checkValue)
      }
    }
    const callback = (event: any /*Event*/) => {
      if (event.storageArea !== localStorage) {
        return
      }
      checkChange()
    }

    window.addEventListener('storage', callback) // only fires if other docs change the storage area

    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, defaultValue || '')
    }

    let intervalSubscription: any = undefined
    if (localChangeCheckSeconds) {
      intervalSubscription = setInterval(
        checkChange,
        localChangeCheckSeconds * 1000
      )
    }

    return () => {
      window.removeEventListener('storage', callback)
      if (intervalSubscription) {
        clearInterval(intervalSubscription)
      }
    }
  }, [])

  return currentValue
}

export default useLocalStorageItem
