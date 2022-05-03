import { useForm, usePrevious } from 'helpers/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCurrentHierarchyID from './useCurrentHierarchyID';
import useCurrentHierarchyType from './useCurrentHierarchyType';

import fetchAllPrelims from 'actions/companyAdmin/prelims/async/fetchAllPrelims';
import linkPrelim from '../../../../actions/companyAdmin/costingAndEstimating/linkPrelim';

import { selectPrelimsArr } from 'selectors/companyAdmin/prelims';

import { PRELIMS_ENUM } from 'constants/companyAdmin/enums';
import { convertArrToObj } from 'helpers/generic';
import { selectJWTData } from '../../../../selectors/shared/decodeJWT';
import { hideModal } from '../../../../actions/shared/generic/modals/sync/hideModal';
import { selectCostingAndEstimatingPostSuccess } from 'selectors/companyAdmin/costingAndEstimating';

const useAddExistingPrelim = () => {
    const dispatch = useDispatch();

    const hierarchyID = useCurrentHierarchyID();
    const hierarchyType = useCurrentHierarchyType();

    const { companyID } = useSelector(selectJWTData);
    const postSuccess = useSelector(selectCostingAndEstimatingPostSuccess);
    const prevPostSuccess = usePrevious(postSuccess);

    const formatArrForDropdown = arr => {
        const options = arr
            .filter(val => val)
            .map(({ name, id, type, value }) => ({
                value: id,
                text: `${name} - (${PRELIMS_ENUM[type] === 'Percent' ? value + '%' : '£' + value})`,
            }));

        return convertArrToObj(options, 'value');
    };

    const allPrelims = useSelector(selectPrelimsArr);
    const prelimsOptions = formatArrForDropdown(allPrelims);
    const isPosting = false;
    const [form, handleChange] = useForm({
        prelimID: '',
    });

    const handleSubmit = () => {
        const postBody = { ...form, hierarchyID, hierarchyType, companyID };

        dispatch(linkPrelim(postBody));
    };

    useEffect(() => {
        dispatch(fetchAllPrelims());
    }, [dispatch]);

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            dispatch(hideModal());
        }
    }, [postSuccess, prevPostSuccess]);

    return {
        form,
        handleChange,
        handleSubmit,
        isPosting,
        prelimsOptions,
    };
};

export default useAddExistingPrelim;
