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
        <ThemeProvider theme={theme}>
            <Authenticator>
                    <PageRouter />
            </Authenticator>
        </ThemeProvider>
    )
}

export default App
