import { useState, useRef, useEffect } from 'react';
import uuid from 'uuid/v4';
import moment from 'moment';

import { removeObjItem } from './generic';

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

export function useForm(initialState = {}) {
    const [formData, setFormData] = useState(initialState);

    function handleChange(name, value) {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return [formData, handleChange];
}

export const useOnScreen = (ref, rootMargin = '0px') => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting);
            },
            {
                rootMargin,
            },
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.unobserve(ref.current);
        };
    }, []);

    return isIntersecting;
};

export const useScreenEnter = (ref, callback) => {
    const [entered, setEntered] = useState(false);

    function activate() {
        if (ref.current && isInViewPort(ref.current.getBoundingClientRect()) && !entered) {
            callback();
            setEntered(true);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', activate);
        return () => document.removeEventListener('scroll', activate);
    });
};

function isInViewPort(rect) {
    if (
        window.screen.height >= rect.bottom &&
        window.screen.width >= rect.right &&
        rect.top >= 0 &&
        rect.left >= 0
    )
        return true;
    return false;
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
