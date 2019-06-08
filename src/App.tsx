import * as React from 'react'
import Amplify from 'aws-amplify'
import '@babel/polyfill'

import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import { Authenticator } from 'auth/components'
import { theme } from 'theme'

import 'assets/favicon.ico'

import PageRouter from './PageRouter'
import awsExports from './aws-exports'

Amplify.configure(awsExports)

function App() {
    return (
        <Authenticator>
            <ThemeProvider theme={theme}>
                <PageRouter />
            </ThemeProvider>
        </Authenticator>
    )
}

export default App
