import { createSlice } from '@reduxjs/toolkit';
import { UserData } from 'store/types';

type UserDataState = {
    userData: UserData;
};

type SetUserDataAction = {
    type: string;
    payload: UserData;
};

type UpdateUserDataAction = {
    type: string;
    payload: Partial<UserData>;
};

const initialState: UserDataState = {
    userData: {
        id: '',
        name: '',
        avatar: '',
        description: '',
        userTrips: [],
        followers: [],
        following: [],
    },
};

export const userDataSlice = createSlice({
    name: 'userData',
    initialState: initialState,
    reducers: {
        setAccount: (state, action: SetUserDataAction) => {
            state.userData = action.payload;
        },
        updateAccount: (state, action: UpdateUserDataAction) => {
            state.userData = { ...state.userData, ...action.payload };
        },
    },
});

export const actions = userDataSlice.actions;
export const userDataReducer = userDataSlice.reducer;
