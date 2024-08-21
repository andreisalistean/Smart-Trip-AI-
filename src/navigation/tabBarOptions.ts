import { useTheme } from 'context/ThemeContext';

const useTabBarOptions = () => {
    const { theme } = useTheme();
    const tabBarOptions = {
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: theme.TAB_COLOR, borderTopWidth: 0 },
        style: {
            borderTopWidth: 0,
        },
    };

    return tabBarOptions;
};

export default useTabBarOptions;
