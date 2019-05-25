import Auth from '@aws-amplify/auth'
import { AuthState } from 'auth/types'

interface ResetPasswordDetails {
    username: string
    password: string
    code: string
}

export const submitForgotPassword = async ({
    username,
    password,
    code,
}: ResetPasswordDetails) => {
    try {
        await Auth.forgotPasswordSubmit(
            username.trim(),
            code,
            password
        )

        return {
            authState: AuthState.NotAuthenticated,
            authData: null,
        }
    } catch(e) {
        throw new Error('Could not reset password.')
    }
}
