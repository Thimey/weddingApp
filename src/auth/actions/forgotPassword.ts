import Auth from '@aws-amplify/auth'
import { AuthState } from 'auth/types'

export const forgotPassword = async ({ username }: { username: string }) => {
    try {
        const trimmedUsername = username.trim()

        const authData = await Auth.forgotPassword(trimmedUsername)

        return {
            authState: AuthState.ForgotPasswordSubmit,
            authData: {
                ...authData,
                username: trimmedUsername,
            },
        }
    } catch(e) {
        throw new Error('Could not reset password.')
    }
}
