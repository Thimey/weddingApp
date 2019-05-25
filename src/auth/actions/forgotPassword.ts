import Auth from '@aws-amplify/auth'
import { AuthState } from 'auth/types'

export const forgotPassword = async ({ username }: { username: string }) => {
    try {
        const authData = await Auth.forgotPassword(username)

        return {
            authState: AuthState.ForgotPasswordSubmit,
            authData: {
                ...authData,
                username,
            },
        }
    } catch(e) {
        throw new Error('Could not reset password.')
    }
}
