import { SHOW_O_AND_M_TS_AND_CS_MODAL } from 'constants/actionTypes/generic';

export const showOAndMTsAndCsModal = message => ({
    type: SHOW_O_AND_M_TS_AND_CS_MODAL,
    message,
});

export default modalType => dispatch => dispatch(showOAndMTsAndCsModal(modalType));
