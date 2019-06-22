import * as React from 'react'

export type InvitationPage = 'landing' | 'rsvp'

interface InvitationContextState {
    page: InvitationPage
    setPage: (newPage: InvitationPage) => void
}

const invitationPageContextDefault: InvitationContextState = {
    page: 'landing',
    setPage: () => {},
}

export const InvitationPageContext = React.createContext(invitationPageContextDefault)
