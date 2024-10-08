import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { appReducer } from './appReducer'

export const store = configureStore({
    reducer: {
        appReducer
    },
    middleware: () => {
        return [logger]
    }
})