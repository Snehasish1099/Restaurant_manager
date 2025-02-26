/**
 * @description This slice is example of a component reducer function that will be created 
 * for each component in container.
 */

import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    users: [],
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.users = action.payload;
            state.loading = true;
            state.error = false;
        },
        createUser: (state, action) => {
            state.users.unshift(action.payload);
            state.loading = false;
        },
        deleteUser: (state, action) => {
            state.users.filter((user) => user.id !== action.payload.id);
            state.loading = false;
        },
    },
});

export const { createUser, deleteUser, getUser } = userSlice.actions;
export default userSlice.reducer;