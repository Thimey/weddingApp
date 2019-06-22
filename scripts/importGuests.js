require('dotenv').config()
const path = require('path')
const fs = require('fs')
const parse = require('csv-parser')

const AWS = require('aws-sdk')

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({ region: 'ap-southeast-2' })

const SEND_INVITES_FOR_REAL = true
const SEND_DELAY_MS = 1000

function getUserCognitoParams({ username, email, phone, fullname }, resend) {
    const params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: username,
        DesiredDeliveryMediums: [
            'SMS',
            'EMAIL',
        ],
        TemporaryPassword: 'abc123',
        UserAttributes: [
            {
                Name: 'email',
                Value: email,
            },
            {
                Name: 'email_verified',
                Value: 'TRUE'
            },
            {
                Name: 'phone_number',
                Value: phone,
            },
            {
                Name: 'phone_number_verified',
                Value: 'TRUE'
            },
            {
                Name: 'custom:fullname',
                Value: fullname
            },
        ],
        ValidationData: []
    }

    if (resend) {
        params.MessageAction = 'RESEND'
    }

    return params
}

async function createUsers(users) {
    if (!users.length) {
        return
    }

    const [
        { username, email, phone, fullname },
        ...remainingUsers
    ] = users

    setTimeout(() => {
        const cognitoParams = getUserCognitoParams({ username, email, phone, fullname }, false)

        if (SEND_INVITES_FOR_REAL) {
            cognitoIdentityServiceProvider.adminCreateUser(cognitoParams, function(err, data) {
                if (err) {
                    console.log(err, err.stack)
                } else {
                    console.log(`Sent ${username} invite:`, data)
                }
            })
        } else {
            console.log(`Sent ${username} invite`)
        }

        createUsers(remainingUsers)
    }, SEND_DELAY_MS)
}

const onlyOverrideUsernames = []

const guests = []

fs.createReadStream(path.resolve(__dirname, '../guests.csv'))
    .pipe(parse())
    .on('data', function(data){
        try {
            guests.push(data)
        }
        catch(err) {
            console.err
        }
    })
    .on('end',function(){
        const usersToSend = guests.reduce((acc, { username, email, phone, fullname, dontSend, sent }) => {
            if (onlyOverrideUsernames.length) {
                return onlyOverrideUsernames.includes(username)
                    ? [...acc, { username, email, phone, fullname }]
                    : acc
            }


            return sent !== 'TRUE' && dontSend !== 'TRUE' && username && email && phone && fullname
                ? [...acc, { username, email, phone, fullname }]
                : acc
        }, [])

        createUsers(usersToSend)
    })


