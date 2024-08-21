import { Trip } from 'utils/types';

export type UserData = {
    id: string;
    userName: string;
    avatar: string;
    userDescription: string;
    userTrips: Trip[];
    followers: string[];
    following: string[];
    userEmail: string;
};

export type Review = {
    authorName: string;
    text: string;
    rating: number;
    userId: string;
};

export type Activity = {
    id: string;
    name: string;
    description: string;
    locationName: string;
    locationLongitude: string;
    locationLatitude: string;
    isComplete: boolean;
    image: string;
};

export type City = {
    latitude: string;
    longitude: string;
    name: string;
    activities: Activity[];
};

export type Day = {
    cities: City[];
};

export type TripData = {
    id: string;
    startDate: string;
    endDate: string;
    country: string;
    description: string;
    reviews?: Review[];
    days: Day[];
    image: string;
    budget: number;
    createdBy: string;
};

export type RecommendedTripData = {
    trips: TripData[];
};
