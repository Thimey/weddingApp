import { useState } from 'react'

export type Validation = (value: string) => string | undefined

export interface UseTextArgs {
    initialValue: string
    validations?: Validation[]
    transform?: (value: string) => string
}

export const useTextInput = ({ initialValue, validations, transform }: UseTextArgs) => {
    const [
        { value, validationMessages },
        setValue,
    ] = useState({ value: initialValue, validationMessages: [] })

    const onChange = (newValue: string) => {
        const transformedValue = transform && typeof transform === 'function'
            ? transform(newValue)
            : newValue

        setValue({
            value: transformedValue,
            validationMessages: validations
                ? validations.reduce((acc, validationFn) => {
                    const message = validationFn(newValue)

                    return message
                        ? acc.concat(message)
                        : acc
                }, [])
                : []
        })
    }

    return {
        value,
        onChange,
        ...(
            validationMessages.length
                ? { helperText: validationMessages.join(', ') }
                : undefined
        ),
        ...(
            validationMessages.length
                ? { invalid: true }
                : undefined
        ),
    }
}