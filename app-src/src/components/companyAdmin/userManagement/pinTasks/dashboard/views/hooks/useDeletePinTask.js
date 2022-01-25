import { useDispatch, useSelector } from 'react-redux';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import deletePinTask from 'actions/companyAdmin/pinTasks/async/deletePinTask';
import { useEffect } from 'react';
import { selectPinTasksPostSuccess } from 'selectors/companyAdmin/pinTasks';
import { usePrevious } from 'helpers/hooks';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_DELETE } from 'constants/shared/modalTypes';

const useDeletePinTask = () => {
    const dispatch = useDispatch();

    const pinTasksPostSuccess = useSelector(selectPinTasksPostSuccess);
    const prevPinTasksPostSuccess = usePrevious(pinTasksPostSuccess);

    const closeModal = () => dispatch(hideModal());

    useEffect(() => {
        if (!prevPinTasksPostSuccess && pinTasksPostSuccess) closeModal();
    }, [dispatch, pinTasksPostSuccess, prevPinTasksPostSuccess]);

    const handleDeleteTask = id => {
        dispatch(
            showModal(CONFIRM_DELETE, {
                message: 'Are you sure you want to delete this task.',
                handleDelete: () => {
                    dispatch(deletePinTask(id));
                    closeModal();
                },
            }),
        );
    };

    return { handleDeleteTask };
};

export default useDeletePinTask;
