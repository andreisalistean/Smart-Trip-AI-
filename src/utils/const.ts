import { Dimensions } from 'react-native';

export enum FontTypes {
    BOLD = 'OpenSans-Bold',
    BOLD_ITALIC = 'OpenSans-BoldItalic',
    EXTRA_BOLD = 'OpenSans-ExtraBold',
    EXTRA_BOLD_ITALIC = 'OpenSans-ExtraBoldItaic',
    ITALIC = 'OpenSans-Italic',
    LIGHT = 'OpenSans-Light',
    LIGHT_ITALIC = 'OpenSans-LightItalic',
    REGULAR = 'OpenSans-Regular',
    SEMI_BOLD = 'OpenSans-SemiBold',
    SEMI_BOLD_ITALIC = 'OpenSans-SemiBoldItalic',
}

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export enum Category {
    Transport = 'Transport',
    Accommodation = 'Accommodation',
    Activities = 'Activities',
    FoodAndDrinks = 'Food & Drinks',
    Other = 'Other',
}
