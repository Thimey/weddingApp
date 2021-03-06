import * as React from 'react'

import { withStyles, WithStyles, createStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import TextInput from 'components/TextInput'
import Button from 'components/Button'

import { setNewPassword, submitForgotPassword } from 'auth/actions'
import { AuthContext } from 'auth/authContext'
import AuthFormContainer from './AuthFormContainer'

import { useTextInput } from 'lib/useTextInput'
import { textMinCharacter } from 'lib/validations'

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

const passwordInvalid = (password1: string) => (password2: string) => {
    if (password1 !== password2) {
        return 'Passwords do not match, please retype'
    }
}

export interface Props extends WithStyles<typeof styles> {
    type: 'forgotSubmit' | 'newRequired'
}

const ChangePassword: React.SFC<Props> = ({ type }) => {
    const [code, onCodeChange] = React.useState('')

    const passwordRetypeInput = useTextInput({
        initialValue: '',
    })

    const passwordInput = useTextInput({
        initialValue: '',
        validations: [
            textMinCharacter(6),
            passwordInvalid(passwordRetypeInput.value)
        ]
    })

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')

    const { authUser, setAuthUser } = React.useContext(AuthContext)

    const handleChangePassword = async () => {
        try {
            if (type === 'newRequired') {
                setLoading(true)

                const newAuthUser = await setNewPassword({
                    authData: authUser.authData,
                    password: passwordInput.value,
                })

                setLoading(false)

                setAuthUser(newAuthUser)
            } else if (type === 'forgotSubmit') {
                setLoading(true)

                const newAuthUser = await submitForgotPassword({
                    username: authUser.authData.username,
                    password: passwordInput.value,
                    code,
                })

                setLoading(false)

                setAuthUser(newAuthUser)
            }
        } catch(e) {
            setError(e.message)
        }
    }

    const disableButton = passwordInput.invalid || loading

    return (
        <AuthFormContainer onSubmit={handleChangePassword}>
            {
                type === 'forgotSubmit' &&
                    <TextInput
                        type='text'
                        label='code'
                        value={code}
                        onChange={onCodeChange}
                    />
            }

            <TextInput
                type='password'
                label='password'
                {...passwordInput}
            />

            <TextInput
                type='password'
                label='Re-type password'
                {...passwordRetypeInput}
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
                onClick={handleChangePassword}
            >
                Update password
            </Button>
        </AuthFormContainer>
    )
}

export default withStyles(styles)(ChangePassword)
