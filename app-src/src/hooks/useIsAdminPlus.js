import { useSelector } from 'react-redux';
import { selectJWTData } from '../selectors/shared/decodeJWT';
import { COMPANY_USER_ROLE_TYPES } from '../constants/companyAdmin/enums';

const useIsAdminPlus = () => {
    const { companyUserType } = useSelector(selectJWTData);
    return companyUserType > COMPANY_USER_ROLE_TYPES.ADMIN;
};

export default useIsAdminPlus;
