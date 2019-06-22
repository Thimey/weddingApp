import * as React from 'react'
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core'

const styles = createStyles({
    imageButton: {
        cursor: 'pointer',
        width: '150px',
        opacity: 0.8,
        '&:hover': {
            opacity: 1,
        }
    }
})

export interface Props extends WithStyles<typeof styles> {
    onClick?: () => void
    src: string
    alt: string
    href?: string
}

const ImageButton: React.SFC<Props> = ({ src, alt, classes, onClick, href }) => (
    href
        ? (
            <a href={href} target='_blank'>
                <img
                    className={classes.imageButton}
                    onClick={onClick}
                    src={src}
                    alt={alt}
                />
            </a>
        )
        : (
            <img
                className={classes.imageButton}
                onClick={onClick}
                src={src}
                alt={alt}
            />
        )

)

export default withStyles(styles)(ImageButton)
