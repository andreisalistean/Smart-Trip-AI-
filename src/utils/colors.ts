export const Colors = {
    WHITE: '#ffffff',
    BLACK: '#000000',
    MAGENTA: '#FF0080',
    PURPLE: '#7928CA',
    DARK_GREY: '#282B39',
    WHITE_OPACITY_10: '#ffffff22',
    BACKGROUND_DARK: '#191B20',
    TRANSPARENT_GREY: 'rgba(0, 0, 0, 0.3)',
    TRANSPARENT_GREY_7: 'rgba(0, 0, 0, 0.7)',
    BRIGHT_DARK: '#181a1f',
    DARK_PURPLE: '#402444',
    PINK: '#CB0C9F',
    LIGHT_MAGENTA: '#FF80BF',
    LIGHT_PURPLE: '#A763C5',
    MID_GREY: '#282A3E',
    SOFT_BLACK: '#585A6E',
    DEEP_PURPLE: '#311B5B',
    BRIGHT_PINK: '#FF66B2',
    MID_PINK: '#D94B97',
    SOFT_PINK: '#FFA3C9',
    RED: '#FF0000',
    LIGHT_GREY: '#D1D1D1',
    ERROR_RED: '#FB5F73',
    GREY: '#CCCCCC',
    SEMI_TRANSPARENT_BG: 'rgba(0, 0, 0, 0.7)',
};

export type Theme = {
    BACKGROUND: string;
    TEXT: string;
    HEADER_TEXT: string;
    ICON_COLOR: string;
    FOCUSED_ICON: string;
    TOGGLE_TEXT: string;
    DROPDOWN_BACKGROUND: string;
    DROPDOWN_TEXT: string;
    GRADIENT_FIRST: string;
    GRADIENT_SECOND: string;
    TRANSPARENT_BACKGROUND: string;
    SMALL_BUTTON_NO_BORDER: string;
    ERROR: string;
    OVERCARD_BACKGROUND: string;
    BORDER_COLOR: string;
    PLACEHOLDER_TEXT: string;
    DEFAULT_BUTTON_COLOR: string;
    DEFAULT_BUTTON_BORDER: string;
    TAB_COLOR: string;
};

export const Light_Theme: Theme = {
    BACKGROUND: '#f4f5f6',
    TEXT: '#000000',
    HEADER_TEXT: '#1d1d1d',
    ICON_COLOR: '#585A6E',
    FOCUSED_ICON: '#A763C5',
    TOGGLE_TEXT: '#000000',
    DROPDOWN_BACKGROUND: '#ffffff',
    DROPDOWN_TEXT: '#000000',
    GRADIENT_FIRST: '#FF0080',
    GRADIENT_SECOND: '#7928CA',
    TRANSPARENT_BACKGROUND: 'rgba(255, 255, 255, 0.3)',
    SMALL_BUTTON_NO_BORDER: '#CB0C9F',
    ERROR: '#FF0000',
    OVERCARD_BACKGROUND: '#ffffff',
    BORDER_COLOR: '#d2d6da',
    PLACEHOLDER_TEXT: '#d2d6da',
    DEFAULT_BUTTON_COLOR: 'rgba(255, 255, 255, 0.2)',
    DEFAULT_BUTTON_BORDER: 'rgba(255, 255, 255, 0.75)',
    TAB_COLOR: '#ffffff',
};
export const Dark_Theme: Theme = {
    BACKGROUND: '#191b20',
    TEXT: '#ffffff',
    HEADER_TEXT: '#ffffff',
    ICON_COLOR: '#585A6E',
    FOCUSED_ICON: '#A763C5',
    TOGGLE_TEXT: '#ffffff',
    DROPDOWN_BACKGROUND: '#ffffff',
    DROPDOWN_TEXT: '#000000',
    GRADIENT_FIRST: '#FF0080',
    GRADIENT_SECOND: '#7928CA',
    TRANSPARENT_BACKGROUND: 'rgba(0, 0, 0, 0.4)',
    SMALL_BUTTON_NO_BORDER: '#CB0C9F',
    ERROR: '#FF0000',
    OVERCARD_BACKGROUND: '#282B39',
    BORDER_COLOR: '#353841',
    PLACEHOLDER_TEXT: '#ffffff22',
    DEFAULT_BUTTON_COLOR: 'rgba(255, 255, 255, 0.2)',
    DEFAULT_BUTTON_BORDER: 'rgba(255, 255, 255, 0.75)',
    TAB_COLOR: '#191b20',
};
