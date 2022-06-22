import patchOverrideShift from 'actions/companyAdmin/timesheets/async/patchOverrideShift';
import { useForm, usePrevious } from 'helpers/hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectTimesheetsIsPosting,
    selectTimesheetsPostError,
    selectTimesheetsPostSuccess,
    timesheetSelectedCompanyIDs,
    timesheetSelectedJobReferenceIDs,
} from 'selectors/companyAdmin/timesheets';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { useEffect } from 'react';
import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import fetchTimesheetsWeek from 'actions/companyAdmin/timesheets/async/fetchTimesheetsWeek';

const useOverrideShift = (shift, handleToggleEdit, startDate, isEditing = false) => {
    const { overrideShiftTime, overrideWage } = shift;
    const dispatch = useDispatch();

    const isPosting = useSelector(selectTimesheetsIsPosting);
    const postError = useSelector(selectTimesheetsPostError);
    const postSuccess = useSelector(selectTimesheetsPostSuccess);
    const companyUserIDs = useSelector(timesheetSelectedCompanyIDs);
    const jobReferenceIDs = useSelector(timesheetSelectedJobReferenceIDs);
    const prevProps = usePrevious({ isPosting, postError, postSuccess, isEditing });

    const [formData, handleChange] = useForm({
        overrideShiftTime: overrideShiftTime || '00:00',
        overrideWage: overrideWage || '0.00',
    });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(
                showModal(SUCCESS_MODAL, { message: 'Shift override completed successfully' }),
            );
            handleToggleEdit(null);
            dispatch(fetchTimesheetsWeek(companyUserIDs, jobReferenceIDs, startDate));
        }
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
