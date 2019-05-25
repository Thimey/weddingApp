import * as React from 'react'
import Typography from '@material-ui/core/Typography'

import { withStyles, createStyles, WithStyles } from '@material-ui/core'

import { logout } from 'auth/actions'
import { AuthContext } from 'auth/authContext'

const styles = createStyles({
    container: {
        width: '100%',
        position: 'fixed',
        top: 0,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    logout: {
        cursor: 'pointer',
        marginRight: '1rem',
    }
})

export interface Props extends WithStyles<typeof styles> {}

const TopMenuBar: React.FC<Props> = ({ classes }) => {
    const { setAuthUser } = React.useContext(AuthContext)
    const [loggingOut, setLoggingOut] = React.useState(false)

    const handleLogout = async () => {
        setLoggingOut(true)

        const authUser = await logout()

        setLoggingOut(false)

        setAuthUser(authUser)
    }

    const color = loggingOut
        ? 'textSecondary'
        : 'primary'

    return (
        <div className={classes.container}>
            <Typography
                className={classes.logout}
                onClick={handleLogout}
                color={color}
            >
                {
                    loggingOut
                        ? 'logging out...'
                        : 'logout'
                }
            </Typography>
        </div>
    )
}

export default withStyles(styles)(TopMenuBar)
