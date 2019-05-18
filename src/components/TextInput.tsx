import * as React from 'react'
import classnames from 'classnames'

import { withStyles, WithStyles, createStyles } from '@material-ui/core'
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField'

const styles = createStyles({
    container: {
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    cssLabel: {
        '&$cssFocused': {
            color: 'black',
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: 'black',
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: 'black',
        },
    },
    notchedOutline: {},
})

export interface Props extends WithStyles<typeof styles> {
    label: string
    onChange: (value: string) => void
    value: string
    invalid?: boolean
    helperText?: TextFieldProps['helperText']
    type?: TextFieldProps['type']
}

const TextInput: React.SFC<Props> = ({
    classes,
    onChange,
    label,
    value,
    invalid,
    helperText,
    type,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className={classes.container}>
            <MuiTextField
                value={value}
                onChange={handleChange}
                fullWidth
                label={label}
                variant='outlined'
                error={invalid}
                type={type}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                helperText={helperText}
            />
        </div>
    )
}

export default withStyles(styles)(TextInput)
