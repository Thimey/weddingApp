import * as React from 'react'
import { API } from 'aws-amplify'
import Typography from '@material-ui/core/Typography'
import { withStyles, WithStyles, createStyles, Theme, CircularProgress } from '@material-ui/core'

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import * as rsvpButton from 'assets/rsvpButton.jpg'

import { getHeaderButtonStyles } from 'sharedStyles'
import { AuthContext } from 'auth/authContext'
import { InvitationPageContext } from './invitationPageContext'

const API_NAME = 'weddingGuests'
const PATH = '/details'

const styles = createStyles({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway',
    },
    home: {
        ...getHeaderButtonStyles('left')
    },
    loadingProgress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    attendingCheckboxesContainer: {
        marginLeft: '2rem',
    },
    dietaryFormLabel: {
        marginTop: '1rem',
        marginLeft: '-2rem'
    },
    dietaryForm: {
    }
})

export interface Props extends WithStyles<typeof styles> {

}

const DEFAULT_STATE: State = {
    attendance: null,
    ceremony: false,
    reception: false,
    recoveryBrunch: false,
    dietaryInfo: null,
    dietaryOther: null,
    formSaved: false,
    pristine: true,
}

export interface State {
    attendance: 'attending' | 'notAttending' | null
    ceremony: boolean
    reception: boolean
    recoveryBrunch: boolean
    dietaryInfo: 'vegetarian' | 'vegan' | null
    dietaryOther: string | null
    formSaved: boolean
    pristine: boolean
}

interface ActionInitialise {
    type: 'initialise'
    value: State
}

interface ActionAttendanceEvent {
    type: 'ceremony' | 'reception' | 'recoveryBrunch',
    value: boolean
}

interface ActionAttendance {
    type: 'attendance'
    value: 'attending' | 'notAttending'
}

interface ActionDietaryInfo {
    type: 'dietaryInfo'
    value: State['dietaryInfo']
}

interface ActionDietaryOther {
    type: 'dietaryOther'
    value: State['dietaryOther']
}

interface ActionFormSaved {
    type: 'formSaved'
    value: boolean
}

type Action = ActionInitialise
    | ActionAttendanceEvent
    | ActionAttendance
    | ActionDietaryInfo
    | ActionDietaryOther
    | ActionFormSaved

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'initialise':
            return {
                ...action.value,
            }
        case 'attendance':
            return {
                ...DEFAULT_STATE,
                attendance: action.value,
                formSaved: false,
                pristine: false,
            }
        case 'ceremony':
        case 'reception':
        case 'recoveryBrunch': {
            const newState = {
                ...state,
                [action.type]: action.value,
                formSaved: false,
                pristine: false,
            }

            const noDietaryInfoNeeded = !newState.reception && !newState.recoveryBrunch

            return noDietaryInfoNeeded
                ? {
                    ...newState,
                    dietaryInfo: null,
                    dietaryOther: null,
                }
                : newState
        }
        case 'dietaryInfo':
            return {
                ...state,
                dietaryInfo: action.value,
                formSaved: false,
                pristine: false,
            }
        case 'dietaryOther':
            return {
                ...state,
                dietaryOther: action.value,
                formSaved: false,
                pristine: false,
            }
        case 'formSaved':
            return {
                ...state,
                formSaved: action.value,
            }
        default:
            throw new Error('unhandled action')
    }
}

const getDietaryState = ({ vegan, vegetarian }: { vegan: boolean, vegetarian: boolean }) => {
    if (vegetarian) {
        return 'vegetarian'
    }

    if(vegan) {
        return 'vegan'
    }

    return null
}

const getDietaryPayload = (dietaryInfo: State['dietaryInfo']) => ({
    vegetarian: dietaryInfo === 'vegetarian',
    vegan: dietaryInfo === 'vegan',
})

let hasSavedDetails = false

const Rsvp: React.FC<Props> = ({ classes }) => {
    const { setPage } = React.useContext(InvitationPageContext)
    const { authUser } = React.useContext(AuthContext)
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [state, dispatch] = React.useReducer(reducer, DEFAULT_STATE)

    React.useEffect(() => {
        const getDetails = async () => {
            const resp = await API.get(
                API_NAME,
                `${PATH}/object/${authUser.authData.username}`,
                {},
            )

            hasSavedDetails = !!resp.guest

            if (resp.guest) {
                const {
                    ceremony,
                    reception,
                    recoveryBrunch,
                    vegetarian,
                    vegan,
                    other,
                } = resp

                const attendance = ceremony || reception || recoveryBrunch

                const savedState: State = {
                    ...DEFAULT_STATE,
                    attendance: attendance ? 'attending' : 'notAttending',
                    ceremony,
                    reception,
                    recoveryBrunch,
                    dietaryInfo: getDietaryState({ vegetarian, vegan }),
                    dietaryOther: other === 'none'
                        ? null
                        : other,
                }

                dispatch({
                    type: 'initialise',
                    value: savedState,
                })
            }

            setLoading(false)
        }

        getDetails()
    }, [])

    const getPayload = () => {
        const { attendance, ceremony, reception, recoveryBrunch, dietaryInfo, dietaryOther } = state
        const attending = attendance === 'attending'

        return {
            guest: authUser.authData.username,
            ceremony: attending && ceremony,
            reception: attending && reception,
            recoveryBrunch: attending && recoveryBrunch,
            ...getDietaryPayload(dietaryInfo),
            other: dietaryOther
                ? dietaryOther
                : 'none',
        }
    }

    const onSave = async () => {
        setSaving(true)
        const resp = hasSavedDetails
            ? await API.put(
                API_NAME,
                PATH,
                {
                    body: {
                        ...getPayload(),
                    }
                }
            )
            : await API.post(
                API_NAME,
                PATH,
                {
                    body: {
                        ...getPayload(),
                    }
                }
            )

        dispatch({ type: 'formSaved', value: !!resp.success })

        setSaving(false)
    }

    const onAttendanceChange = (value: State['attendance']) => (e) => dispatch({
        type: 'attendance',
        value,
    })

    const onAttendanceCheckChange = (type: ActionAttendanceEvent['type']) => () => dispatch({
        type,
        value: !state[type],
    })

    const onDietaryInfoChange = (value: State['dietaryInfo']) => () => dispatch({
        type: 'dietaryInfo',
        value,
    })

    const noEventsSelected = state.attendance === 'attending'
        && !state.ceremony
        && !state.reception
        && !state.recoveryBrunch

    return (
        <div className={classes.container}>
            <Typography className={classes.home} onClick={() => setPage('landing')}>
                Home
            </Typography>
            <img src={rsvpButton} />
            {
                loading
                    ? (
                        <div className={classes.loadingProgress}>
                            <CircularProgress />
                        </div>
                    )
                    : (
                        <div className={classes.formContainer}>
                            <FormControl>
                                <FormControlLabel onChange={onAttendanceChange('notAttending')} control={<Radio checked={state.attendance === 'notAttending'} />} label='I regretfully cannot attend' />
                                <FormControlLabel onChange={onAttendanceChange('attending')} control={<Radio checked={state.attendance === 'attending' } />} label='I would love to attend' />
                                {
                                    state.attendance === 'attending' &&
                                        <FormControl required error={noEventsSelected}>
                                            <FormGroup className={classes.attendingCheckboxesContainer}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={state.ceremony}
                                                            onChange={onAttendanceCheckChange('ceremony')}
                                                        />
                                                    }
                                                    label="Ceremony"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={state.reception}
                                                            onChange={onAttendanceCheckChange('reception')}
                                                        />
                                                    }
                                                    label="Reception"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={state.recoveryBrunch}
                                                            onChange={onAttendanceCheckChange('recoveryBrunch')}
                                                        />
                                                    }
                                                    label="Recovery Brunch (Sunday, 12th)"
                                                />
                                                {
                                                    (state.reception || state.recoveryBrunch) && (
                                                        <>
                                                            <FormLabel className={classes.dietaryFormLabel}>
                                                                Special dietary requirements?
                                                            </FormLabel>
                                                            <FormGroup className={classes.dietaryForm}>
                                                                {/* <FormControlLabel
                                                                    onChange={onDietaryInfoChange('vegetarian')}
                                                                    control={<Radio checked={state.dietaryInfo === 'vegetarian'} />}
                                                                    label='Vegetarian'
                                                                /> */}
                                                                <FormControlLabel
                                                                    onChange={onDietaryInfoChange('vegetarian')}
                                                                    control={<Radio checked={state.dietaryInfo === 'vegetarian'} />}
                                                                    label='Vegetarian'
                                                                />
                                                                <FormControlLabel
                                                                    onChange={onDietaryInfoChange('vegan')}
                                                                    control={<Radio checked={state.dietaryInfo === 'vegan' } />}
                                                                    label='Vegan'
                                                                />
                                                            </FormGroup>
                                                        </>
                                                    )
                                                }
                                            </FormGroup>
                                            <FormHelperText hidden={!noEventsSelected}>
                                                You said you were coming, let us know which events you will attend!
                                            </FormHelperText>
                                        </FormControl>
                                }
                            </FormControl>
                            <Button
                                fullWidth
                                disabled={
                                    !state.attendance
                                    || loading
                                    || saving
                                    || state.formSaved
                                    || state.pristine
                                    || noEventsSelected
                                }
                                onClick={onSave}
                            >
                                {
                                    saving
                                        ? 'Saving...'
                                        : 'Save'
                                }
                            </Button>
                        </div>
                    )
            }
            {
                state.formSaved && (
                    <Typography>
                        Details saved, shanks!
                    </Typography>
                )
            }
        </div>
    )
}

export default withStyles(styles)(Rsvp)
