import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';

import { selectOperative } from 'selectors/companyAdmin/operatives';
import {
    selectPins,
    selectPinsFetchError,
    selectPinsIsFetching,
} from 'selectors/companyAdmin/pins';

const usePinOptions = (service, template, companyUserID, drawingID) => {
    const dispatch = useDispatch();

    const pins = useSelector(selectPins) ?? [];
    const isFetching = useSelector(selectPinsIsFetching);
    const error = useSelector(selectPinsFetchError);

    const op = useSelector(state => selectOperative(state, companyUserID));

    useEffect(() => {
        dispatch(fetchPins('Drawing', drawingID));
    }, [drawingID]);

    const pinOptions = useMemo(() => {
        return Object.values(pins).reduce((acc, pin) => {
            if (op?.serviceIDs.includes(pin.latestServiceID)) {
                acc.push({ value: pin.id, label: pin.pinCode });
            }
            return acc;
        }, []);
    }, [pins, service, template, op]);

    const pinOptionsFilter = ({ value }) => {
        const { latestServiceID, templateID } = pins[value];
        let valid = true;
        if (service) {
            valid = latestServiceID === service;
        }
        if (template) {
            valid = templateID === template;
        }

        return valid;
    };

    return { pinOptions, pinOptionsFilter, isFetching, error };
};

export default usePinOptions;
