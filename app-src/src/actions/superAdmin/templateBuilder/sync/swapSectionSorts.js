import { SWAP_SECTION_SORTS } from 'constants/actionTypes/templateBuilder';

export default (section1Uuid, section2Uuid) => dispatch =>
    dispatch({
        type: SWAP_SECTION_SORTS,
        section1Uuid,
        section2Uuid,
    });
