import { PUSH_NOTIFICATION_TO_BANNER } from 'constants/actionTypes/banner';
import { v1 as uuidv3 } from 'uuid';

export const addBanner = (bannerContent, bannerDismiss = false) => ({
    type: PUSH_NOTIFICATION_TO_BANNER,
    payload: {
        id: uuidv3(),
        content: bannerContent,
        showDismiss: bannerDismiss,
        bgColor: '#d71a1a',
    },
});
