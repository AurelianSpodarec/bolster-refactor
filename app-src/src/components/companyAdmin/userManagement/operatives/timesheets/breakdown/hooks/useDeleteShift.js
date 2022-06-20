import showModal from 'actions/shared/generic/modals/sync/showModal';
import { DELETE_SHIFT, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTimesheetsDeleteSuccess } from 'selectors/companyAdmin/timesheets';

const useDeleteShift = (shifts = []) => {
    const dispatch = useDispatch();

    const deleteSuccess = useSelector(selectTimesheetsDeleteSuccess);
    const prevSuccess = usePrevious(deleteSuccess);

    const handleShowDeleteShiftModal = id => {
        const thisShift = shifts.find(shift => shift.id === id);
        const message = thisShift?.lastClockedOutTime
            ? `Are you sure you want to delete this shift from ${moment
                  .utc(thisShift.lastClockedOutTime)
                  .format('DD/MM/YYYY')}?`
            : 'Are you sure you want to delete this shift?';

        dispatch(showModal(DELETE_SHIFT, { shiftID: id, message }));
    };

    useEffect(() => {
        if (!prevSuccess && deleteSuccess) {
            dispatch(showModal(SUCCESS_MODAL, { message: 'Shift deleted successfully' }));
        }
    }, [deleteSuccess, prevSuccess]);

    return { handleShowDeleteShiftModal };
};

export default useDeleteShift;
