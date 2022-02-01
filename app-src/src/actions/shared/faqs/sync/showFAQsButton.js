import { SHOW_FAQs_BUTTON } from 'constants/actionTypes/faqs';

export default payload => dispatch =>
    dispatch({
        type: SHOW_FAQs_BUTTON,
        payload,
    });
