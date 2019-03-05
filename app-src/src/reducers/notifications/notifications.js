import {
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE
} from 'constants/actionTypes/notifications';

const initialState = {
    notifications: [],
    notificationsLength: 0,
    isFetching: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                isFetching: true,
                success: false,
                error: null
            };
        case FETCH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                notifications: action.payload,
                notificationsLength: action.payload.filter(
                    notification => !notification.isSeen
                ).length
            };
        case FETCH_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };
        default:
            return state;
    }
};
