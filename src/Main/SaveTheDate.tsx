import * as React from 'react'
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const styles = createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
    },

    dateContainer: {
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
        marginTop: '2rem',
        justifySelf: 'flex-end',
    }
})

export interface Props extends WithStyles<typeof styles> {

}

const SaveTheDate: React.SFC<Props> = ({ classes }) => {

    return (
        <div className={classes.container}>
            <Typography align='center' variant='display1'>
                Simon &amp; Kathryn are getting married!!
            </Typography>

            <div className={classes.dateContainer}>
                {/* <Typography variant='h6' align='center'>
                    Save the date:
                </Typography> */}

                <Typography className={classes.date} variant='h6'>
                    09/11/2019
                </Typography>
            </div>

            <Typography className={classes.address} variant='h6'>
                Berry, NSW 2535
            </Typography>

            <Typography className={classes.note} variant='caption'>
                You'll be updated when we update this page with more info soon!
            </Typography>
        </div>
    )
}

export default withStyles(styles)(SaveTheDate)
