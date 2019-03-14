import { SHOW_MODAL } from 'constants/actionTypes/generic';

export const showModal = (modalType, modalProps = {}) => ({
    type: SHOW_MODAL,
    modalType,
    modalProps
});

export default (modalType, modalProps) => dispatch =>
    dispatch(showModal(modalType, modalProps));
