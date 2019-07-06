import { useState } from 'react';
import uuid from 'uuid/v4';
import moment from 'moment';

import { removeObjItem } from './generic';

export const useMultipleHierarchies = hierarchyShape => {
    // takes an empty version of the hierarchy shape / initial state for a blank hierarchy
    const firstID = uuid();
    const [state, setState] = useState({
        [firstID]: { ...hierarchyShape, id: firstID }
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

    function addHierarchy() {
        const newID = uuid();
        setState({ ...state, [newID]: { ...hierarchyShape, id: newID } });
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
            [id]: { ...state[id], [fieldName]: value }
        });
    }

    function getState() {
        return state;
    }

    return [
        state,
        updateState,
        addHierarchy,
        deleteHierarchy,
        getKeys,
        getPostBody,
        getState
    ];
};
