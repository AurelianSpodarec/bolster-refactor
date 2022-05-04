import { useForm, usePrevious } from 'helpers/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCurrentHierarchyID from './useCurrentHierarchyID';
import useCurrentHierarchyType from './useCurrentHierarchyType';

import fetchAllPrelims from 'actions/companyAdmin/prelims/async/fetchAllPrelims';
import linkPrelim from '../../../../actions/companyAdmin/costingAndEstimating/linkPrelim';

import {
    selectPrelimIsPosting,
    selectPrelimPostSuccess,
    selectPrelimsArr,
} from 'selectors/companyAdmin/prelims';

import { PRELIMS_ENUM } from 'constants/companyAdmin/enums';
import { convertArrToObj, formatCurrency } from 'helpers/generic';
import { selectJWTData } from '../../../../selectors/shared/decodeJWT';
import { hideModal } from '../../../../actions/shared/generic/modals/sync/hideModal';

const useLinkPrelim = () => {
    const dispatch = useDispatch();

    const hierarchyID = useCurrentHierarchyID();
    const hierarchyType = useCurrentHierarchyType();

    const { companyID } = useSelector(selectJWTData);
    const postSuccess = useSelector(selectPrelimPostSuccess);
    const isPosting = useSelector(selectPrelimIsPosting);
    const prevPostSuccess = usePrevious(postSuccess);

    const formatArrForDropdown = arr => {
        const options = arr
            .filter(val => val)
            .map(({ name, id, type, value }) => ({
                value: id,
                text: `${name} - (${
                    PRELIMS_ENUM[type] === 'Percent' ? value + '%' : '£' + formatCurrency(value)
                })`,
            }));

        return convertArrToObj(options, 'value');
    };

    const allPrelims = useSelector(selectPrelimsArr);
    const prelimsOptions = formatArrForDropdown(allPrelims);

    const [form, handleChange] = useForm({
        prelimID: '',
    });

    const handleSubmit = () => {
        const postBody = { ...form, hierarchyID, hierarchyType, companyID };

        dispatch(linkPrelim(postBody));
    };

    const closeModal = () => {
        dispatch(hideModal());
    };

    useEffect(() => {
        dispatch(fetchAllPrelims());
    }, [dispatch]);

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            closeModal();
        }
    }, [postSuccess, prevPostSuccess]);

    return {
        form,
        handleChange,
        handleSubmit,
        isPosting,
        prelimsOptions,
        closeModal,
    };
};

export default useLinkPrelim;
