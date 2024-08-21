import { configureStore } from '@reduxjs/toolkit';

import { tripDataReducer } from './reducers/tripDataReducer';
import { userDataReducer } from './reducers/userDataReducer';

export const store = configureStore({
    reducer: {
        userDataReducer,
        tripDataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
