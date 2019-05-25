import * as React from 'react'

import { withStyles, createStyles, Theme } from '@material-ui/core'
import * as weddingLogo from 'assets/weddingLogo.png'

import TopMenuBar from './TopMenuBar'
import SaveTheDate from './SaveTheDate'

const styles = (theme: Theme) => createStyles({
    container: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    contentContainer: {
        // background: theme.palette.grey[100],
        width: '100%',
        flex: 1,
    },
    logo: {
        marginTop: '4rem',
        marginBottom: '4rem',
        width: '200px',
    },
})

function Main({ classes }) {
    return (
        <div className={classes.container}>
            <TopMenuBar />

            <img
                className={classes.logo}
                src={weddingLogo}
            />

            <div className={classes.contentContainer}>
                <SaveTheDate />
            </div>
        </div>
    )
}

export default withStyles(styles)(Main)
