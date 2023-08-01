import { useEffect, useState } from 'react'

// the debounce is used to handle the event when the user stops trying and not update immediately
export function useDebounce<T>(value: T, delay?: number): T {
    const [debounceValue, setDebounceValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounceValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debounceValue
}