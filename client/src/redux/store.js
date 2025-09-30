import { configureStore } from "@reduxjs/toolkit";
import eventReducer from './event/eventSlice'

export const store = configureStore({
    reducer: {
        event: eventReducer
    }
})