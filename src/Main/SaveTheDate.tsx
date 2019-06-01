import * as React from 'react'
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

import * as simonandkat from 'assets/sandk.jpg'

const styles = createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem',
    },
    title: {
        color: 'black',
        fontFamily: 'Homemade Apple, cursive, Roboto, sans-serif',
        lineHeight: '4rem',
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
    date: {
        fontWeight: 'bold',
    },
    address: {
        marginTop: '2rem',
        fontWeight: 'bolder',
    },
    note: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem',
        marginBottom: '1rem',
    }
})

export interface Props extends WithStyles<typeof styles> {

}

const SaveTheDate: React.SFC<Props> = ({ classes }) => {

    return (
        <div className={classes.container}>
            <Typography align='center' variant='display1' className={classes.title}>
                Simon &amp; Kathryn are getting married!
            </Typography>

            <Avatar
                className={classes.avatar}
                src={simonandkat}
            />

            <div className={classes.dateContainer}>
                <Typography variant='h6' align='center'>
                    Save the date
                </Typography>

                <Typography className={classes.date} variant='h6'>
                    09 - 11 - 2019
                </Typography>
            </div>

            <Typography className={classes.address} variant='h6'>
                Berry, NSW 2535
            </Typography>

            <div className={classes.note}>
                <Typography align='center' variant='caption'>
                    Consider booking accommodation early.
                </Typography>

                <Typography align='center'  variant='caption'>
                    We’ll update you with more information soon!
                </Typography>

            </div>
        </div>
    )
}

export default withStyles(styles)(SaveTheDate)
