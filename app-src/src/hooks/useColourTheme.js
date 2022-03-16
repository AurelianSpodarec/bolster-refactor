import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocalStorage } from '../helpers/hooks';

import { selectIsDarkModeEnabled } from '../selectors/shared/colourTheme';
import usePrevious from './usePrevious';

const useColourTheme = () => {
    const isDarkModeEnabled = useSelector(selectIsDarkModeEnabled);

    const [isDarkMode] = useLocalStorage('isDarkModeEnabled', isDarkModeEnabled);
    const [colourTheme, setColourTheme] = useState(isDarkMode ? 'dark' : 'light');

    const prevDarkMode = usePrevious(isDarkModeEnabled);

    useEffect(() => {
        if (isDarkModeEnabled !== prevDarkMode) {
            setColourTheme(isDarkModeEnabled ? 'dark' : 'light');
        }
    }, [isDarkModeEnabled, prevDarkMode]);

    return colourTheme;
};

export default useColourTheme;
