import * as React from 'react'

import { AuthUser } from './types'

export const useAuth = (initialAuthUser: AuthUser) => {
    const [authUser, setAuth] = React.useState(initialAuthUser)

    const setAuthUser = (authUser: any) => {
        setAuth(authUser)
    }

    return {
        authUser,
        setAuthUser,
    }
}
