import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core'

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'


import { InvitationPageContext } from './invitationPageContext'

const styles = createStyles({

})

export interface Props extends WithStyles<typeof styles> {

}

export interface State {
    attendance: 'attending' | 'notAttending' | null
    attendanceDetails: {
        ceremony: boolean
        reception: boolean
        recoveryBrunch: boolean
        dietaryInfo: {
            type: 'vegetarian' | 'vegan'
        } | null
    } | null
}

const useCheckbox = (initialCheck: boolean): [boolean, (e: any) => void] => {
    const [checked, setChecked] = React.useState(initialCheck)

    return [
        checked,
        (e) => setChecked(e.target.checked)
    ]
}

const Rsvp: React.FC<Props> = () => {
    const { setPage } = React.useContext(InvitationPageContext)

    const [attendance, setAttendance] = React.useState<State['attendance']>(null)
    const [attendingCeremony, setAttendingCeremony] = useCheckbox(false)
    const [attendingReception, setAttendingReception] = useCheckbox(false)
    const [attendingBrunch, setAttendingBrunch] = useCheckbox(false)

    const onSave = () => {
        const payload: State = {
            attendance,
            attendanceDetails: attendance === 'attending'
                ? {
                    ceremony: attendingCeremony,
                    reception: attendingReception,
                    recoveryBrunch: attendingBrunch,
                    dietaryInfo: null,
                }
            : null
        }

        console.log('payload', payload)
    }

    return (
        <>
            <FormControl>
                {/* <FormLabel></FormLabel> */}
                <RadioGroup
                    onChange={(e: any) => setAttendance(e.target.value)}
                    value={attendance}
                >
                    <FormControlLabel value='attending' control={<Radio />} label='I would love to attend' />
                    {
                        attendance === 'attending' &&
                            <>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            checked={attendingCeremony}
                                            onChange={setAttendingCeremony}
                                            />
                                        }
                                        label="Ceremony"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={attendingReception}
                                                onChange={setAttendingReception}
                                            />
                                        }
                                        label="Reception"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={attendingBrunch}
                                                onChange={setAttendingBrunch}
                                            />
                                        }
                                        label="Recovery Brunch (Sunday, 12th)"
                                    />
                                </FormGroup>
                                <FormHelperText>Be careful</FormHelperText>
                            </>
                    }
                    <FormControlLabel value='notAttending' control={<Radio />} label='I regretfully cannot attend' />
                </RadioGroup>

            </FormControl>


            <Button disabled={!attendance} onClick={onSave}>
                Save
            </Button>

            <Typography onClick={() => setPage('landing')}>
                Home
            </Typography>
        </>
    )
}

export default withStyles(styles)(Rsvp)
