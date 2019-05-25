import * as React from 'react'

import { withStyles, WithStyles, createStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import TextInput from 'components/TextInput'
import Button from 'components/Button'

import { forgotPassword } from 'auth/actions'
import { AuthContext } from 'auth/authContext'
import AuthFormContainer from './AuthFormContainer'
import { AuthState } from 'auth/types'

const styles = createStyles({
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    avatar: {
        width: '80px',
        height: '80px',
    },
})

export interface LoginDetails {
    username: string
    password: string
}

export interface Props extends WithStyles<typeof styles> {}

const Login: React.SFC<Props> = ({ classes }) => {
    const [username, onNameChange] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')

    const { setAuthUser } = React.useContext(AuthContext)

    const handleForgotPassword = async () => {
        setLoading(true)

        try {
            const { authState, authData } = await forgotPassword({ username })

            setLoading(false)

            setAuthUser({ authState, authData })
        } catch(e) {
            setError(e.message)

            setLoading(false)
        }
    }

    const handleBackToLogin = () => {
        setAuthUser({
            authState: AuthState.NotAuthenticated,
            authData: null,
        })
    }

    const disableButton = !username || loading

    return (
        <AuthFormContainer onSubmit={handleForgotPassword}>
            <TextInput
                label='name'
                value={username}
                onChange={onNameChange}
            />

            {
                error && (
                    <Typography color='error'>
                        {error}
                    </Typography>
                )
            }

            <Button
                type='submit'
                disabled={disableButton}
                onClick={handleForgotPassword}
            >
                Request new password
            </Button>

            <Typography onClick={handleBackToLogin} color='primary'>
                Back to login
            </Typography>
        </AuthFormContainer>
    )
}

export default withStyles(styles)(Login)
