import { createStore } from 'redux'
import { Reducer, initialState } from './reducer'

export const configStore = () => {
    const store = createStore(Reducer,initialState)
    return store
}