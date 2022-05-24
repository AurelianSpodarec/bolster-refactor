import { useDispatch } from 'react-redux';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import _hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { QUICK_EDIT_OPTION_SET_MODAL } from 'constants/shared/modalTypes';

const useOptionSetActions = set => {
    const dispatch = useDispatch();

    const hideModal = () => {
        dispatch(_hideModal());
    };

    const showQuickEditModal = () => {
        console.log('showQuickEdit');
        dispatch(showModal(QUICK_EDIT_OPTION_SET_MODAL, { set, hideModal }));
    };

    const showEditSetModal = () => {
        console.log('showEditSet');
        // dispatch(showModal(QUICK_EDIT_OPTION_SET_MODAL, { set, hideModal }));
    };

    return { showQuickEditModal, showEditSetModal };
};

export default useOptionSetActions;
