import { useState, useRef, useEffect } from 'react';
import uuid from 'uuid/v4';
import moment from 'moment';

import { removeObjItem } from './generic';
import { useDispatch, useSelector } from 'react-redux';
import resendTwoFactor from 'actions/shared/auth/async/resendTwoFactor';

export const useMultipleHierarchies = hierarchyShape => {
    // takes an empty version of the hierarchy shape / initial state for a blank hierarchy
    const firstID = uuid();
    const [state, setState] = useState({
        [firstID]: { ...hierarchyShape, id: firstID },
    });

    function getKeys() {
        return Object.keys(state);
    }

    function getPostBody() {
        return Object.values(state).map(hierarchy => {
            // eslint-disable-next-line no-unused-vars
            const { id, isAlertShowing, dateToSend, ...rest } = hierarchy;

            return isAlertShowing
                ? { dateToSend: moment(dateToSend).format(), ...rest }
                : removeObjItem(removeObjItem(rest, 'message'), 'dateToSend');
        });
    }

    function addHierarchy(initialOptions) {
        const newID = uuid();

        if (initialOptions) {
            setState({ ...state, [newID]: { ...hierarchyShape, ...initialOptions, id: newID } });
        } else {
            setState({ ...state, [newID]: { ...hierarchyShape, id: newID } });
        }
    }

    function deleteHierarchy(id) {
        // eslint-disable-next-line no-unused-vars
        const { [id]: removed, ...newState } = state;

        setState(newState);
    }

    function updateState(name, value) {
        // * This is to split the field validations up
        const [id, fieldName] = name.split('.*.');
        return setState({
            ...state,
            [id]: { ...state[id], [fieldName]: value },
        });
    }

    function updateSelectAll(select = true, name, options = []) {
        const [id, fieldName] = name.split('.*.');

        const selectAll = options.reduce((res, item) => [...res, item.value + ''], []);

        return setState({
            ...state,
            [id]: { ...state[id], [fieldName]: select ? selectAll : [] },
        });
    }

    function getState() {
        return state;
    }

    function setInitialHierarchyManufacturerOptions(initialOptions, id) {
        const isInitialSet = !id;

        if (isInitialSet) {
            // for the first building of the form
            const formState = Object.entries(state);
            let [buildingID, buildingState] = formState[0];

            const newState = { [buildingID]: { ...buildingState, ...initialOptions } };
            setState(newState);
        }
    }

    return [
        state,
        updateState,
        addHierarchy,
        deleteHierarchy,
        getKeys,
        getPostBody,
        getState,
        setInitialHierarchyManufacturerOptions,
        updateSelectAll,
    ];
};

export function usePrevious(value) {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export function useDebounce(action, deps = [], timeout = 1000) {
    let debounceTimeout;
    useEffect(() => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(action, timeout);
        return () => clearTimeout(debounceTimeout);
    }, deps);
}

export const useLocalStorage = (key, initialValue = 'placeholder') => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            return;
        }
    };

    return [storedValue, setValue];
};

export function useForm(initialState = {}) {
    const [formData, setFormData] = useState(initialState);

    function handleChange(name, value) {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return [formData, handleChange, setFormData];
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export const useIsMobile = (mobileWidth = 1024) => {
    const [isWidthMobile, setIsWidthMobile] = useState(true);
    const isIOS =
        (/iPad|iPhone|iPod/.test(navigator.platform) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
        !window.MSStream;

    useEffect(() => {
        function handleResize() {
            setIsWidthMobile(window.innerWidth < mobileWidth);
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isWidthMobile || isIOS;
};

// resending 2FA code
export const useResend2FA = email => {
    const dispatch = useDispatch();
    const [canResend2FA, setCanResend2FA] = useState(false);
    const [lastResent, setLastResent] = useState(Date.now());

    const mapStateToProps = ({
        shared: {
            loginReducer: { resendTwoFactorSuccess, showTwoFactor },
        },
    }) => ({
        resendTwoFactorSuccess,
        showTwoFactor,
    });

    const { resendTwoFactorSuccess, showTwoFactor } = useSelector(mapStateToProps);

    const prevProps = usePrevious({ resendTwoFactorSuccess, showTwoFactor });

    useEffect(() => {
        if (showTwoFactor && !prevProps.showTwoFactor) {
            setLastResent(Date.now());
        }
    }, [showTwoFactor, prevProps.showTwoFactor]);

    useEffect(() => {
        if (resendTwoFactorSuccess && !prevProps.resendTwoFactorSuccess) {
            setCanResend2FA(false);
            setLastResent(Date.now());
        }
    }, [resendTwoFactorSuccess, prevProps.resendTwoFactorSuccess]);

    return { canResend2FA, setCanResend2FA, lastResent, handleResendTwoFactor };

    function handleResendTwoFactor(e) {
        e.preventDefault();
        dispatch(resendTwoFactor({ email }));
    }
};
