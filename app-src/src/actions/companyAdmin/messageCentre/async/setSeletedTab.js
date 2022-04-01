import { SELECT_MESSAGE_CENTRE_TAB } from 'constants/actionTypes/messageCentre';

const setSelectedTab = payload => ({
    type: SELECT_MESSAGE_CENTRE_TAB,
    payload,
});

export default setSelectedTab;
