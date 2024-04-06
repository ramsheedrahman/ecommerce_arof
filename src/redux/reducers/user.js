import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    loading: false,
    token:null,
    user: null,
    error: null,
};

export const userReducer = createReducer(initialState, {
    LoginRequest: (state) => {
        state.loading = true;
    },
    LoginSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload.user;
        state.token=action.payload.token
    },
    LoginFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    ClearError: (state) => {
        state.error = null;
    },
});
