import patchOverrideShift from 'actions/companyAdmin/timesheets/async/patchOverrideShift';
import { useForm, usePrevious } from 'helpers/hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectTimesheetsIsPosting,
    selectTimesheetsPostError,
    selectTimesheetsPostSuccess,
} from 'selectors/companyAdmin/timesheets';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { useEffect } from 'react';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { formatAsHrsMins, formatCurrency } from 'helpers/generic';

const useOverrideShift = (shift, handleToggleEdit, startDate, isEditing = false) => {
    const {
        overrideShiftTime,
        overrideWage,
        hoursBreakdown: { totalHours, totalWageSplit },
    } = shift;
    const dispatch = useDispatch();

    const isPosting = useSelector(selectTimesheetsIsPosting);
    const postError = useSelector(selectTimesheetsPostError);
    const postSuccess = useSelector(selectTimesheetsPostSuccess);
    const prevProps = usePrevious({ isPosting, postError, postSuccess, isEditing });

    const [formData, handleChange] = useForm({
        overrideShiftTime: overrideShiftTime ? overrideShiftTime : formatAsHrsMins(totalHours),
        overrideWage: overrideWage ? overrideWage : formatCurrency(totalWageSplit),
    });

    useEffect(() => {
        if (postError && !prevProps.postError) {
            dispatch(
                showModal(ERROR_MODAL, {
                    message: 'Something went wrong. Please try again later.',
                }),
            );
            handleToggleEdit(null);
        }
    }, [postSuccess, postError, prevProps.postSuccess, prevProps.postError]);

    const handleSubmit = () => {
        dispatch(
            patchOverrideShift(shift.id, {
                ...formData,
                overrideShiftTime: formData.overrideShiftTime.split(':').slice(0, 2).join(':'),
            }),
        );
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        isPosting,
        postError,
    };
};

export default useOverrideShift;
