// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: {
        email: string;
        username?: string;
        avatar?: string;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRequest(state, action: PayloadAction<{ email: string; password: string }>) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<{ email: string; username?: string; avatar?: string }>) {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        signupRequest(state, action: PayloadAction<{ email: string; password: string; username: string; avatar: File | null }>) {
            state.loading = true;
            state.error = null;
        },
        signupSuccess(state, action: PayloadAction<{ email: string; username?: string; avatar?: string }>) {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        signupFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    signupRequest,
    signupSuccess,
    signupFailure,
    logout,
} = userSlice.actions;

export default userSlice.reducer;
