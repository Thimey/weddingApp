import * as React from 'react'

import { withStyles, WithStyles, createStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import * as weddingLogo from 'assets/weddingLogo.png'
import TextInput from 'components/TextInput'
import Button from 'components/Button'

import { login } from 'auth/actions'
import { AuthContext } from 'auth/authContext'
import AuthFormContainer from './AuthFormContainer'
import { AuthState } from 'auth/types'

import { useTextInput } from 'lib/useTextInput'

const styles = createStyles({
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    weddingLogo: {
        width: '150px',
    }
})

export interface LoginDetails {
    username: string
    password: string
}

export interface Props extends WithStyles<typeof styles> {}

const Login: React.SFC<Props> = ({ classes }) => {
    const usernameInput = useTextInput({
        initialValue: '',
        transform: v => v.toLowerCase()
    })
    const passwordInput = useTextInput({ initialValue: '' })
    const [loading, setLoading] = React.useState(false)
    const [loginError, setLoginError] = React.useState('')

    const { setAuthUser } = React.useContext(AuthContext)

    const handleLogin = async () => {
        setLoading(true)

        try {
            const { authState, authData } = await login({
                username: usernameInput.value,
                password: passwordInput.value,
            })

            setLoading(false)

            setAuthUser({ authState, authData })
        } catch(e) {
            setLoginError(e.message)

            setLoading(false)
        }
    }

    const handleForgotPassword = () => {
        setAuthUser({
            authState: AuthState.ForgotPassword,
            authData: null,
        })
    }

    const disableButton = !usernameInput.value || !passwordInput.value || loading

    return (
        <AuthFormContainer onSubmit={handleLogin}>
            <div className={classes.titleContainer}>
                <img
                    className={classes.weddingLogo}
                    src={weddingLogo}
                />
                {/* <Avatar
                    className={classes.avatar}
                    src={sandk}
                /> */}
            </div>

            <TextInput
                label='name'
                {...usernameInput}
            />

            <TextInput
                type='password'
                label='password'
                {...passwordInput}
            />

            {
                loginError && (
                    <Typography color='error'>
                        {loginError}
                    </Typography>
                )
            }

            <Button
                type='submit'
                disabled={disableButton}
                onClick={handleLogin}
            >
                Login
            </Button>

            <Typography onClick={handleForgotPassword} color='primary'>
                Forgot password
            </Typography>
        </AuthFormContainer>
    )
}

export default withStyles(styles)(Login)
