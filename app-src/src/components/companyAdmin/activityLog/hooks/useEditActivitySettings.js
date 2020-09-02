import { useState, useMemo } from 'react';
import {
    ACTIVITY_LOG_REFERENCE_TYPES,
    ACTIVITY_LOG_ACTION_TYPES,
    ACTIVITY_LOG_REFERENCE_VALUES,
    ACTIVITY_LOG_ACTION_VALUES,
} from 'constants/companyAdmin/enums';

const { SITE, BUILDING, FLOOR, DRAWING } = ACTIVITY_LOG_REFERENCE_TYPES;
const { CREATE, UPDATE, DELETE } = ACTIVITY_LOG_ACTION_TYPES;

const opts = {
    [SITE]: [CREATE, UPDATE, DELETE],
    [BUILDING]: [CREATE, UPDATE, DELETE],
    [FLOOR]: [CREATE, UPDATE, DELETE],
    [DRAWING]: [CREATE, UPDATE, DELETE],
};

function getOptions() {
    return Object.keys(opts).map(key => {
        return {
            label: ACTIVITY_LOG_REFERENCE_VALUES[key],
            value: +key,
            actionOptions: opts[key].map(act => ({
                label: ACTIVITY_LOG_ACTION_VALUES[act],
                value: +act,
            })),
        };
    });
}

export default function (apiSettings) {
    const [selected, setSelected] = useState(formatInitialState());
    const options = useMemo(getOptions, []);

    function formatInitialState() {
        return apiSettings.map(({ referenceType, actionType }) => ({ referenceType, actionType }));
    }

    function checkIsSelected(ref, action) {
        return selected.some(item => item.referenceType === ref && item.actionType === action);
    }

    function handleChange(ref, action) {
        const value = checkIsSelected(ref, action)
            ? selected.filter(item => item.referenceType !== ref || item.actionType !== action)
            : selected.concat({ referenceType: ref, actionType: action });

        setSelected(value);
    }

    return [selected, handleChange, options, checkIsSelected];
}
