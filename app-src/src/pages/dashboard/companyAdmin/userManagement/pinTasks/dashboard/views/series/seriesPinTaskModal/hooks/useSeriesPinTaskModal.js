import { useDispatch } from 'react-redux';

import { SERIES_PIN_TASK_MODAL } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';

const useSeriesPinTaskModal = (pins, isFetching, error) => {
    const dispatch = useDispatch();
    const handleShowSeriesPinTaskModal = () =>
        dispatch(showModal(SERIES_PIN_TASK_MODAL, { pins, isFetching, error }));

    return {
        handleShowSeriesPinTaskModal,
    };
};

export default useSeriesPinTaskModal;
