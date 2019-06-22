const commonHeaderButtonStyles = {
    cursor: 'pointer' as 'pointer',
    position: 'absolute' as 'absolute',
    top: 10,
}

export const getHeaderButtonStyles = (position: 'left' | 'right') => (
    position === 'right'
        ? {
            ...commonHeaderButtonStyles,
            right: 10,
        }
        : {
            ...commonHeaderButtonStyles,
            left: 10,
        }
)
