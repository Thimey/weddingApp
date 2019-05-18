export enum AuthState {
    Authenticated = 'authenticated',
    NotAuthenticated = 'notAuthenticated',
    ForgotPassword = 'forgotPassword',
    ForgotPasswordSubmit = 'forgotPasswordSubmit',
    NewPasswordRequired = 'newPasswordRequired',
}

export interface AuthUser {
    authState: AuthState
    authData: any | null
}
