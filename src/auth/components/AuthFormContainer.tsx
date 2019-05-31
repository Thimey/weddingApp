import * as React from 'react'

import { withStyles, WithStyles, createStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import * as weddingLogo from 'assets/weddingLogo.png'

const styles = createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '100vh',
    },
    formContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        padding: '2rem',
        paddingTop: 0,
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    weddingLogo: {
        width: '150px',
    },
    title: {
        marginTop: '1rem'
    }
})

export interface Props extends WithStyles<typeof styles> {
    onSubmit: () => void
    title?: string
}

const AuthFormContainer: React.SFC<Props> = ({ classes, children, onSubmit, title }) => {
    const handleSubmit = (e: any) => {
        // Stop the fucking page from refreshing
        e.preventDefault()

        onSubmit()
    }

    return (
        <div className={classes.container}>
            <div className={classes.logoContainer}>
                <img
                    className={classes.weddingLogo}
                    src={weddingLogo}
                />
            </div>

            {
                title && (
                    <Typography className={classes.title}>
                        {title}
                    </Typography>
                )
            }
            <form onSubmit={handleSubmit} className={classes.formContainer}>
                {children}
            </form>
        </div>
    )
}


export default withStyles(styles)(AuthFormContainer)
