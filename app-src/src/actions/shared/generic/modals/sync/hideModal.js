import { HIDE_MODAL } from 'constants/actionTypes/generic';

export const hideModal = () => ({
    type: HIDE_MODAL
});

export default () => dispatch => dispatch(hideModal());
