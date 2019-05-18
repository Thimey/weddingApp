import * as React from 'react'
import Auth from '@aws-amplify/auth'

import { AuthState, AuthUser } from '../types'
import { AuthContext } from '../authContext'
import { useAuth } from '../useAuth'

async function setAuthState(setAuth: (authUser: AuthUser) => any) {
    try {
        const authData = await Auth.currentAuthenticatedUser()

        setAuth({
            authState: AuthState.Authenticated,
            authData,
        })
    } catch(e) {
        console.error(e)
    }
}

const Authenticator: React.FC = ({ children }) => {
    const auth = useAuth({
        authState: AuthState.NotAuthenticated,
        authData: null,
    })

    React.useEffect(() => {
        setAuthState(auth.setAuthUser)
    }, [])

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export default Authenticator
