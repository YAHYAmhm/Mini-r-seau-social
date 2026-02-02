import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem('currentUser');
        },
    },
});

export const { setCurrentUser, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.currentUser;

export default authSlice.reducer;
