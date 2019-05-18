import * as React from 'react'

import { withStyles, createStyles, Theme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import TopMenuBar from './TopMenuBar'

const styles = (theme: Theme) => createStyles({
    container: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        background: theme.palette.grey[100],
        width: '100%',
    }
})

function Main({ classes }) {
    return (
        <div className={classes.container}>
            <TopMenuBar />

            <div className={classes.contentContainer}>
                <Typography>
                    Top secret wedding stuff
                </Typography>
            </div>
        </div>
    )
}

export default withStyles(styles)(Main)
