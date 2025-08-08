import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './authSlice'
const store = configureStore({
    reducer: {
    auth: authSliceReducer, // ✅ this names it as `state.auth`
  },
});

export default store;