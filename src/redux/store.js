import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  // Import authSlice

const store = configureStore({
  reducer: {
    auth: authReducer,  // Set authSlice as the reducer for the auth state
  },
});

export default store;
