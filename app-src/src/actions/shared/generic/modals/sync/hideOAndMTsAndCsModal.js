import { HIDE_O_AND_M_TS_AND_CS_MODAL } from 'constants/actionTypes/generic';

export const hideOAndMTsAndCsModal = () => ({
    type: HIDE_O_AND_M_TS_AND_CS_MODAL,
});

export default () => dispatch => dispatch(hideOAndMTsAndCsModal());
