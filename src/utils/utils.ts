import React from 'react';

import { TripData } from 'store/types';

import { Colors } from './colors';
import { FontTypes } from './const';

export const FONT_MAPPING = {
    [FontTypes.BOLD]: require('../assets/fonts/OpenSans-Bold.ttf'),
    [FontTypes.BOLD_ITALIC]: require('../assets/fonts/OpenSans-BoldItalic.ttf'),
    [FontTypes.EXTRA_BOLD]: require('../assets/fonts/OpenSans-ExtraBold.ttf'),
    [FontTypes.ITALIC]: require('../assets/fonts/OpenSans-Italic.ttf'),
    [FontTypes.LIGHT]: require('../assets/fonts/OpenSans-Light.ttf'),
    [FontTypes.LIGHT_ITALIC]: require('../assets/fonts/OpenSans-LightItalic.ttf'),
    [FontTypes.REGULAR]: require('../assets/fonts/OpenSans-Regular.ttf'),
    [FontTypes.SEMI_BOLD]: require('../assets/fonts/OpenSans-SemiBold.ttf'),
    [FontTypes.SEMI_BOLD_ITALIC]: require('../assets/fonts/OpenSans-SemiBoldItalic.ttf'),
};

export const GRADIENT_COLORS = {
    first: Colors.MAGENTA,
    second: Colors.PURPLE,
};

export const GRADIENT_STYLES = {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
};

export const GRADIENT_STYLES2 = {
    start: { x: 1, y: 0 },
    end: { x: 0, y: 1 },
};

export const GRADIENT_STYLES3 = {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
};

type Props = {
    color: string;
    transparency: string;
};
export const addTransparency = ({ color, transparency }: Props): string => {
    return color + transparency;
};

export const compareStrings = (a: string, b: string) => {
    if (a > b) {
        return 1;
    }
    if (b > a) {
        return -1;
    }
    return 0;
};

export const calculateRating = (item: TripData) => {
    if (!item.reviews) {
        return 0;
    }
    let sum = 0;
    const array = [];

    Object.keys(item.reviews).forEach((key) => {
        array.push({ [key]: item.reviews[key] });
        sum += item.reviews[key].rating;
    });

    return sum / array.length;
};
export const calculateTripLength = (item: TripData) => {
    const start = new Date(item.startDate);
    const end = new Date(item.endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

export const compareUserNames = (a: string, b: string): number => {
    const name = (name: string) => name.trim().toLowerCase().split(' ');

    const partsA = name(a);
    const partsB = name(b);

    for (let i = 0; i < Math.min(partsA.length, partsB.length); i++) {
        const comparison = compareStrings(partsA[i], partsB[i]);
        if (comparison !== 0) {
            return comparison;
        }
    }

    return partsA.length - partsB.length;
};

export const ALL_LANGUAGES = [
    { id: '1', name: 'English', code: 'en-US' },
    { id: '2', name: 'Hungarian', code: 'hu-HU' },
    { id: '3', name: 'Romanian', code: 'ro-RO' },
];

export const renderIcon = (
    Icon: React.ReactElement,
    size: number,
    startColor: string,
    endColor?: string,
    focused?: boolean,
) => {
    const sizeNumber = focused ? size + 5 : size;
    const fillColor = focused ? endColor : startColor;

    return React.cloneElement(Icon, {
        height: sizeNumber,
        width: sizeNumber,
        fill: fillColor,
    });
};

export const validEmail = new RegExp(
    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
);

export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

export enum ENDPOINTS {
    FOLLOWING = 'following',
    FOLLOWERS = 'followers',
}
