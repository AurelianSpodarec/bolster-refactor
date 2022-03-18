import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocalStorage } from '../helpers/hooks';

import { selectIsDarkModeEnabled } from '../selectors/shared/colourTheme';

const useColourTheme = () => {
    const isDarkModeEnabled = useSelector(selectIsDarkModeEnabled);

    const [isDarkMode] = useLocalStorage('isDarkModeEnabled', isDarkModeEnabled);
    const [colourTheme, setColourTheme] = useState(isDarkMode ? 'dark' : 'light');

    useEffect(() => {
        if (isDarkModeEnabled !== null) {
            localStorage.setItem('isDarkModeEnabled', isDarkModeEnabled);
            setColourTheme(isDarkModeEnabled ? 'dark' : 'light');
        }
    }, [isDarkModeEnabled]);
    return colourTheme;
};

export default useColourTheme;
