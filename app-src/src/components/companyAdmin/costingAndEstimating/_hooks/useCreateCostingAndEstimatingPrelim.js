import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'helpers/hooks';
import useCurrentHierarchyID from './useCurrentHierarchyID';
import useCurrentHierarchyType from './useCurrentHierarchyType';

import { convertEnumToDropdownOptions } from '../../../../helpers/generic';
import { costingAndEstimatingType, PRELIMS_ENUM } from '../../../../constants/companyAdmin/enums';
import createCostingAndEstimatingPrelim from 'actions/companyAdmin/costingAndEstimating/createCostingAndEstimatingPrelim';
import { useEffect } from 'react';

import usePrevious from 'hooks/usePrevious';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectPrelimIsPosting,
    selectPrelimPostError,
    selectPrelimPostSuccess,
} from '../../../../selectors/companyAdmin/prelims';
import { selectHierarchySelectedTab } from '../../../../selectors/shared/tabs';

const useCreateCostingAndEstimatingPrelim = () => {
    const dispatch = useDispatch();
    const prelimsOptions = convertEnumToDropdownOptions(PRELIMS_ENUM);
    const hierarchyID = useCurrentHierarchyID();
    const hierarchyType = useCurrentHierarchyType();

    const isPosting = useSelector(selectPrelimIsPosting);
    const postError = useSelector(selectPrelimPostError);
    const postSuccess = useSelector(selectPrelimPostSuccess);
    const prevProps = usePrevious({ postError, postSuccess });
    const selectedTab = useSelector(selectHierarchySelectedTab);
    const selectedTabType = costingAndEstimatingType[selectedTab.toUpperCase()];

    const [form, handleChange] = useForm({
        name: '',
        value: null,
        type: null,
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
            costEstType: selectedTabType,
            hierarchyID,
            hierarchyType,
        };

        dispatch(createCostingAndEstimatingPrelim(postBody));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) closeModal();
    }, [postSuccess, prevProps.postSuccess]);

    const closeModal = () => {
        dispatch(hideModal());
    };

    return { form, handleChange, handleSubmit, isPosting, prelimsOptions, closeModal };
};

export default useCreateCostingAndEstimatingPrelim;
