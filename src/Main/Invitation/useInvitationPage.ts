import * as React from 'react'

import { InvitationPage } from './invitationPageContext'

export const useInvitationPage = (initialPage: InvitationPage) => {
    const [page, setPage] = React.useState(initialPage)

    return {
        page,
        setPage,
    }
}
