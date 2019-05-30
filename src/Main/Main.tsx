import * as React from 'react'

import { withStyles, createStyles, Theme } from '@material-ui/core'
import * as weddingLogo from 'assets/weddingLogo.png'

import MenuBar from './MenuBar'
import SaveTheDate from './SaveTheDate'

const styles = (theme: Theme) => createStyles({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    contentContainer: {
        width: '100%',
        flex: 1,
    },
    logo: {
        marginTop: '6rem',
        marginBottom: '2rem',
        width: '150px',
    },
})

function Main({ classes }) {
    return (
        <div className={classes.container}>
            <div className={classes.contentContainer}>
                <SaveTheDate />
            </div>

            <MenuBar />
        </div>
    )
}

export default withStyles(styles)(Main)
