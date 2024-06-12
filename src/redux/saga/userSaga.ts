// store/userSaga.ts
import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { login, signup } from '@/services/authService';
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    signupFailure,
    signupRequest,
    signupSuccess
} from "@/redux/slice/userSlice";

interface LoginAction {
    type: string;
    payload: {
        email: string;
        password: string;
    };
}

interface SignupAction {
    type: string;
    payload: {
        email: string;
        password: string;
        username: string;
        avatar: File | null;
    };
}

function* handleLogin(action: LoginAction): Generator<any, void, any> {
    try {
        const user = yield call(login, action.payload.email, action.payload.password);
        yield put(loginSuccess(user));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        yield put(loginFailure(errorMessage));
    }
}

function* handleSignup(action: SignupAction): Generator<any, void, any> {
    try {
        const user = yield call(signup, action.payload.email, action.payload.password, action.payload.username, action.payload.avatar);
        yield put(signupSuccess(user));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        yield put(signupFailure(errorMessage));
    }
}

export default function* userSaga(): Generator {
    yield all([
        fork(function*() {
            yield takeLatest(loginRequest.type, handleLogin);
        }),
        fork(function*() {
            yield takeLatest(signupRequest.type, handleSignup);
        }),
    ]);
}
