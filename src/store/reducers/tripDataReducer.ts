import { createSlice } from '@reduxjs/toolkit';
import { TripData } from 'store/types';

type TripsDataState = {
    tripsData: TripData[];
};

type SetTripsDataAction = {
    type: string;
    payload: TripData[];
};

type UpdateTripDataAction = {
    type: string;
    payload: TripData;
};

const initialState: TripsDataState = {
    tripsData: [],
};

export const tripDataSlice = createSlice({
    name: 'tripData',
    initialState: initialState,
    reducers: {
        setTrips: (state, action: SetTripsDataAction) => {
            state.tripsData = action.payload;
        },
        updateTrips: (state, action: UpdateTripDataAction) => {
            const updatedTrip = action.payload;
            const index = state.tripsData.findIndex(
                (trip) => trip.id === updatedTrip.id,
            );
            if (index !== -1) {
                state.tripsData[index] = updatedTrip;
            }
        },
    },
});

export const actions = tripDataSlice.actions;
export const tripDataReducer = tripDataSlice.reducer;
