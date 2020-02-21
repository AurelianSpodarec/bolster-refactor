import { SET_IS_IE10 } from "constants/actionTypes/generic";

export default isIE10 => async dispatch =>
    await dispatch({
        type: SET_IS_IE10,
        isIE10
    });
