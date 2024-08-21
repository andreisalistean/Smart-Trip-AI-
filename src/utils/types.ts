import { ViewStyle } from 'react-native';

type Activity = {
    name: string;
    activityName: string;
    description: string;
    locationName: string;
    activityLongitude: number;
    activityLatitude: number;
};

type City = {
    name: string;
    cityLatitude: number;
    cityLongitude: number;
    Activities: Activity[];
};

type Day = {
    date: string;
    Cities: City[];
};
export type Trip = {
    id: string;
    startDate: string;
    endDate: string;
    country: string;
    Days: Day[];
    description: string;
    createdBy: string;
};

export type Language = {
    id: string;
    name: string;
    code: string;
};

export type EditBudgetButtonProps = {
    tripID: number;
    style?: ViewStyle;
};
