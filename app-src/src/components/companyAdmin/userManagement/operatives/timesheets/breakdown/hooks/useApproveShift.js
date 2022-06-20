import showModal from 'actions/shared/generic/modals/sync/showModal';
import { APPROVE_SHIFT, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTimesheetsPostSuccess } from 'selectors/companyAdmin/timesheets';

const useApproveShift = (shifts = []) => {
    const dispatch = useDispatch();

    const postSuccess = useSelector(selectTimesheetsPostSuccess);
    const prevSuccess = usePrevious(postSuccess);

    const handleShowApproveShiftModal = id => {
        const thisShift = shifts.find(shift => shift.id === id);
        const message = thisShift?.lastClockedOutTime
            ? `Are you sure you want to approve this shift from ${moment
                  .utc(thisShift.lastClockedOutTime)
                  .format('DD/MM/YYYY')}?`
            : 'Are you sure you want to approve this shift?';

        dispatch(showModal(APPROVE_SHIFT, { shiftID: id, message }));
    };

    useEffect(() => {
        if (!prevSuccess && postSuccess) {
            dispatch(showModal(SUCCESS_MODAL, { message: 'Shift approved successfully' }));
        }
    }, [postSuccess, prevSuccess]);

    return { handleShowApproveShiftModal };
};

export default useApproveShift;
