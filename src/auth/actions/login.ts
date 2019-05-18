import Auth from '@aws-amplify/auth'
import { AuthUser, AuthState } from 'auth/types'

interface LoginDetails {
    username: string
    password: string
}

export const login = async ({ username, password }: LoginDetails): Promise<AuthUser> => {
    try {
        const authData = await Auth.signIn(username, password)

        if (authData.signInUserSession !== null) {
            return { authState: AuthState.Authenticated, authData };
        }

        if (authData.challengeName === 'NEW_PASSWORD_REQUIRED') {
            return {
                authState: AuthState.NewPasswordRequired,
                authData,
            }
        }

        throw new Error('Invalid credentials')
    } catch (e) {
        throw(e)
    }
}
