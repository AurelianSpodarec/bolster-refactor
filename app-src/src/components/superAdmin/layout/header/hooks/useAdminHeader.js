import { useDispatch, useSelector } from 'react-redux';

import { selectIsMobile } from '../../../../../selectors/shared/mobile';
import { toggleMobileMenu as toggleMobileMenuAction } from 'actions/shared/mobile/sync/toggleMobileMenu';

export const useAdminHeader = () => {
    const dispatch = useDispatch();
    const isMobile = useSelector(selectIsMobile);

    const toggleMobileMenu = () => {
        dispatch(toggleMobileMenuAction());
    };

    return {
        isMobile,
        toggleMobileMenu,
    };
};

export default useAdminHeader;
