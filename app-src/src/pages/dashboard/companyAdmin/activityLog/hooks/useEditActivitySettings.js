import { useState, useMemo } from 'react';
import {
    ACTIVITY_LOG_REFERENCE_TYPES,
    ACTIVITY_LOG_ACTION_TYPES,
    ACTIVITY_LOG_REFERENCE_VALUES,
    ACTIVITY_LOG_ACTION_VALUES,
} from 'constants/companyAdmin/enums';

const {
    SITE,
    BUILDING,
    FLOOR,
    DRAWING,
    USER,
    USER_PASSWORD,
    OPERATIVE_ALERT,
    CLIENT_ACCESS,
    COMPANY_PERMISSIONS,
    DOCUMENT,
    PIN_OPTION,
    TEMPLATE_QUESTION,
    USER_DRAWINGS,
    COMPANY_SETTINGS,
    QR_CODE,
    SUBSCRIPTION,
    MESSAGE,
    OPERATIVE_PERMISSIONS,
    USER_TYPE,
} = ACTIVITY_LOG_REFERENCE_TYPES;
const { CREATE, UPDATE, DELETE, ENABLE, DISABLE, ACCEPT, DECLINE, ARCHIVE, UNARCHIVE, READ } =
    ACTIVITY_LOG_ACTION_TYPES;

const opts = {
    [SITE]: [CREATE, UPDATE, DELETE],
    [BUILDING]: [CREATE, UPDATE, DELETE],
    [FLOOR]: [CREATE, UPDATE, DELETE],
    [DRAWING]: [CREATE, UPDATE, DELETE, ARCHIVE, UNARCHIVE],
    [DOCUMENT]: [CREATE, UPDATE],
    [PIN_OPTION]: [CREATE, ENABLE, DISABLE],
    [TEMPLATE_QUESTION]: [UPDATE],
    [COMPANY_PERMISSIONS]: [CREATE, UPDATE, ACCEPT, DECLINE],
    [USER]: [CREATE, UPDATE],
    [USER_PASSWORD]: [UPDATE],
    [USER_TYPE]: [UPDATE],
    [OPERATIVE_PERMISSIONS]: [CREATE],
    [USER_DRAWINGS]: [DELETE],
    [QR_CODE]: [CREATE],
    [OPERATIVE_ALERT]: [CREATE],
    [CLIENT_ACCESS]: [CREATE],
    [COMPANY_SETTINGS]: [UPDATE],
    [SUBSCRIPTION]: [UPDATE],
    [MESSAGE]: [READ],
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
    const options = useMemo(getOptions, []);

    const optionsFormatted = useMemo(() => {
        return options.reduce((acc, curOption) => {
            const referenceType = curOption.value;
            const arrToAdd = [];

            curOption.actionOptions.forEach(action =>
                arrToAdd.push({ referenceType, actionType: action.value }),
            );

            return [...acc, ...arrToAdd];
        }, []);
    });
    const [selected, setSelected] = useState(formatInitialState());

    function formatInitialState() {
        return optionsFormatted
            .filter(option => {
                return !apiSettings.some(setting => {
                    return (
                        setting.referenceType === option.referenceType &&
                        setting.actionType === option.actionType
                    );
                });
            })
            .map(({ referenceType, actionType }) => ({ referenceType, actionType }));
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

    function selectAll() {
        setSelected(optionsFormatted);
    }

    function deselectAll() {
        setSelected([]);
    }

    const selectionToSubmit = optionsFormatted.filter(option => {
        return !selected.some(selected => {
            return (
                selected.referenceType === option.referenceType &&
                selected.actionType === option.actionType
            );
        });
    });

    return [selectionToSubmit, handleChange, options, checkIsSelected, selectAll, deselectAll];
}
