import { useSelector } from 'react-redux';
import { selectJWTData } from '../selectors/shared/decodeJWT';
import { COMPANY_USER_ROLE_TYPES } from '../constants/companyAdmin/enums';

const useIsAdminPlus = () => {
    const { companyUserType } = useSelector(selectJWTData);
    const isAdminPlus = companyUserType > COMPANY_USER_ROLE_TYPES.ADMIN;

    return isAdminPlus;
};

export default useIsAdminPlus;
