import * as React from 'react'

import { AuthUser, AuthState } from './types'

interface AuthContext {
    authUser: AuthUser
    setAuthUser: (authUser: AuthUser) => any
}

const authContextDefault: AuthContext = {
    authUser: {
        authState: AuthState.NotAuthenticated,
        authData: null,
    },
    setAuthUser: () => {},
}

export const AuthContext = React.createContext(authContextDefault)
