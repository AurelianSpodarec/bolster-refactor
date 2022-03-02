import { isEmpty } from 'helpers/generic';
import { useSelector } from 'react-redux';

import { selectProfile } from 'selectors/shared/profile';

export const useGetUserInitials = () => {
    const profile = useSelector(selectProfile);

    const initials = isEmpty(profile) ? null : `${profile.firstName[0]}${profile.lastName[0]}`;

    return initials;
};

export default useGetUserInitials;
