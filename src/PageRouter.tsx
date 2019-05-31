import * as React from 'react'

import { withStyles } from '@material-ui/core'

import { Login, ChangePassword, ForgotPassword } from 'auth/components'
import { AuthContext } from 'auth/authContext'
import { AuthState } from 'auth/types'
import { assertNever } from 'lib/assertNever'
import Main from 'Main'

const styles = {
    container: {
        // height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}

const getPage = (authState: AuthState) => {
    if (authState === AuthState.Authenticated) {
        return <Main />
    }

    if (authState === AuthState.ForgotPassword) {
        return <ForgotPassword />
    }

    if (authState === AuthState.ForgotPasswordSubmit) {
        return <ChangePassword type='forgotSubmit' />
    }

    if (authState === AuthState.NotAuthenticated) {
        return <Login />
    }

    if (authState === AuthState.NewPasswordRequired) {
        return <ChangePassword type='newRequired' />
    }

    assertNever(authState, 'unhandled authState page')
}

function PageRouter({ classes }) {
    const { authUser } = React.useContext(AuthContext)

    return (
        <div className={classes.container}>
            {
                getPage(authUser.authState)
            }
        </div>
    )
}

export default withStyles(styles)(PageRouter)
