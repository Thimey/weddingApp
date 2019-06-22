import * as React from 'react'
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core'

import { InvitationPageContext } from './invitationPageContext'
import Landing from './Landing'
import Rsvp from './Rsvp'

const styles = createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem',
    },
})

export interface Props extends WithStyles<typeof styles> {

}

const Invitation: React.SFC<Props> = ({ classes }) => {
    const { page } = React.useContext(InvitationPageContext)

    const renderPage = () => {
        if (page === 'landing') {
            return <Landing />
        }

        if (page === 'rsvp') {
            return <Rsvp />
        }

        return null
    }

    return (
        <div className={classes.container}>
            {
                renderPage()
            }
        </div>
    )
}

export default withStyles(styles)(Invitation)
