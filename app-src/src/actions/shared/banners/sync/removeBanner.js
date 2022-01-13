import { REMOVE_NOTIFICATION_TO_BANNER } from 'constants/actionTypes/banner';

export const removeBanner = bannerId => ({
    type: REMOVE_NOTIFICATION_TO_BANNER,
    payload: bannerId,
});
