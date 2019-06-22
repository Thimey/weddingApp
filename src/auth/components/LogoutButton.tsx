import * as React from 'react'
import Typography from '@material-ui/core/Typography'

import { withStyles, createStyles, WithStyles } from '@material-ui/core'

import { logout } from 'auth/actions'
import { AuthContext } from 'auth/authContext'

import { getHeaderButtonStyles } from 'sharedStyles'

const styles = createStyles({
    logout: {
        ...getHeaderButtonStyles('right'),
    }
})

export interface Props extends WithStyles<typeof styles> {}

const LogoutButton: React.FC<Props> = ({ classes }) => {
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
    )
}

export default withStyles(styles)(LogoutButton)
