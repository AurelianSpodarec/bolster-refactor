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
        setState({ ...state, [newID]: { ...hierarchyShape, id: newID } });

        if (initialOptions) {
            setInitialHierarchyManufacturerOptions(initialOptions, newID);
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
        } else {
            // when add building is clicked, we still want the initial options prefilled
            const newState = { ...state, [id]: { ...state[id], ...initialOptions } };

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

export function useThrottle(action, timeout = 1000, deps = []) {
    let throttleTimeout;
    useEffect(() => {
        clearTimeout(throttleTimeout);
        throttleTimeout = setTimeout(action, timeout);
        return () => clearTimeout(throttleTimeout);
    }, deps);
}
