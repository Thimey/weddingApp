import * as React from 'react'
import Amplify from 'aws-amplify'

import { Authenticator } from 'auth/components'
import PageRouter from './PageRouter'

import awsExports from './aws-exports'

Amplify.configure(awsExports)

function App() {
    return (
        <Authenticator>
            <PageRouter />
        </Authenticator>
    )
}

export default App
