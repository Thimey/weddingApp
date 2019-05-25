import * as React from 'react'

import { withStyles, createStyles, WithStyles } from '@material-ui/core'

import LogoutButton from 'auth/components/LogoutButton'

const styles = createStyles({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1rem'
    },
})

export interface Props extends WithStyles<typeof styles> {}

const MenuBar: React.FC<Props> = ({ classes }) => {
    return (
        <div className={classes.container}>
            <LogoutButton />
        </div>
    )
}

export default withStyles(styles)(MenuBar)
