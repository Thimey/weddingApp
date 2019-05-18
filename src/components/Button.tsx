import * as React from 'react'

import MUIButton, { ButtonProps } from '@material-ui/core/Button'
import { withStyles, WithStyles, createStyles } from '@material-ui/core'


const styles = createStyles({
    button: {
        marginTop: '1rem',
        marginBottom: '1rem',
    }
})

export type Props = WithStyles<typeof styles> & ButtonProps

const Button: React.SFC<Props> = ({ classes, ...props }) => {
    return (
        <MUIButton
            variant="outlined"
            color="inherit"
            className={classes.button}
            {...props}
        />
    )
}

export default withStyles(styles)(Button)
