import Auth from '@aws-amplify/auth'
import { AuthState } from 'auth/types'

interface NewPasswordDetails {
    authData: any
    password: string
}

export const setNewPassword = async ({ authData, password }: NewPasswordDetails) => {
    try {
        const currentUserAuthData = await Auth.completeNewPassword(
            authData,
            password,
            [],
        )

        return {
            authState: AuthState.Authenticated,
            authData: currentUserAuthData,
        }
    } catch (e) {
        return {
            authState: AuthState.NotAuthenticated,
            authData: null,
        }
    }
}
