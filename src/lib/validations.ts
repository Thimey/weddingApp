
export const textRequired = (value: string) => {
    if (!value) {
        return 'Required'
    }
}

export const textMinCharacter = (minCharacter: number) => (value: string) => {
    if (value.length < minCharacter) {
        return `Min characters is ${minCharacter}`
    }
}
