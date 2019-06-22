import * as React from 'react'
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

import * as simonandkat from 'assets/sandk.jpg'
import * as rsvpButton from 'assets/rsvpButton.jpg'
import * as downloadInviteButton from 'assets/downloadInviteButton.jpg'
import * as invitePdf from 'assets/invite.pdf'

import { funkyFont } from 'sharedStyles'
import { InvitationPageContext } from './invitationPageContext'

import ImageButton from 'components/ImageButton'

const styles = createStyles({
    title: {
        ...funkyFont,
    },
    avatar: {
        height: '160px',
        width: '160px',
        marginTop: '2rem',
    },
    dateContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem'
    },
    actionContainer: {
        display: 'flex',
    },
    date: {
        ...funkyFont,
    },
    address: {
        marginTop: '2rem',
        fontWeight: 'bolder',
    },
})

export interface Props extends WithStyles<typeof styles> {

}

const Landing: React.SFC<Props> = ({ classes }) => {
    const { setPage } = React.useContext(InvitationPageContext)

    return (
        <>
            <Typography align='center' variant='display2' className={classes.title}>
                Simon &amp; Kathryn are getting married!
            </Typography>

            <Avatar
                className={classes.avatar}
                src={simonandkat}
            />

            <div className={classes.dateContainer}>
                <Typography className={classes.date} variant='h6'>
                    09 - 11 - 2019
                </Typography>
            </div>

            <div className={classes.actionContainer}>
                <ImageButton src={rsvpButton} alt='rsvp' onClick={() => setPage('rsvp')} />
                <ImageButton src={downloadInviteButton} alt='downloadInvite' href={invitePdf} />
            </div>
        </>
    )
}

export default withStyles(styles)(Landing)
