import {configureStore} from '@reduxjs/toolkit'
import bill from './slices/bill'

const store = configureStore({reducer: {
    bill
}})
export default store