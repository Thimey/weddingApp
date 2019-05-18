import * as React from 'react'

import { withStyles, WithStyles, createStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

const styles = createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        maxWidth: '400px',
        padding: '2rem',
    },
})

export interface Props extends WithStyles<typeof styles> {
    onSubmit: () => void
}

const AuthFormContainer: React.SFC<Props> = ({ classes, children, onSubmit }) => (
    <form onSubmit={onSubmit} className={classes.container}>
        {children}
    </form>
)


export default withStyles(styles)(AuthFormContainer)
