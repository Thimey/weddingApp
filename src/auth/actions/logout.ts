import { Auth } from 'aws-amplify'

import { AuthState } from 'auth/types'

export const logout = async () => {
    await Auth.signOut()

    return {
        authState: AuthState.NotAuthenticated,
        authData: null,
    }
}
