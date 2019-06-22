import * as React from 'react'
import Auth from '@aws-amplify/auth'

import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import { AuthState, AuthUser } from '../types'
import { AuthContext } from '../authContext'
import { useAuth } from '../useAuth'

const styles = createStyles({
    loaderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    }
})

export interface Props extends WithStyles<typeof styles> {

}

const Authenticator: React.FC = ({ children, classes }) => {
    const auth = useAuth({
        authState: AuthState.NotAuthenticated,
        authData: null,
    })

    const [initialising, setInitialising] = React.useState(false)

    React.useEffect(() => {
        async function setAuthState(setAuth: (authUser: AuthUser) => any) {
            setInitialising(true)

            try {
                const authData = await Auth.currentAuthenticatedUser()

                setAuth({
                    authState: AuthState.Authenticated,
                    authData,
                })
            } catch(e) {
                console.error(e)
            }

            setInitialising(false)
        }

        setAuthState(auth.setAuthUser)
    }, [])

    return (
        <AuthContext.Provider value={auth}>
            {
                initialising
                    ? (
                        <div className={classes.loaderContainer}>
                            <CircularProgress />
                        </div>
                    )
                    : children
            }
        </AuthContext.Provider>
    )
}

export default withStyles(styles)(Authenticator)
