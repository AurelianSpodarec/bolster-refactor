import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CREATE_PIN_OPTIONS_SET_MODAL,
    EDIT_PIN_OPTIONS_SET_MODAL,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import setOptionSetAsDefault from 'actions/companyAdmin/pinOptions/async/setOptionSetAsDefault';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import enablePinOptionSet from 'actions/companyAdmin/pinOptions/async/enablePinOptionSet';
import disablePinOptionSet from 'actions/companyAdmin/pinOptions/async/disablePinOptionSet';
import {
    selectPinOptionDefaultSet,
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostError,
} from 'selectors/companyAdmin/pinOptionSets';

const useOptionSetActions = selectedTypeID => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postError = useSelector(selectPinOptionSetsPostError);

    const prevProps = usePrevious({ postError });

    const defaultSet = useSelector(state => selectPinOptionDefaultSet(state, selectedTypeID));

    const showAddModal = () => {
        dispatch(
            showModal(CREATE_PIN_OPTIONS_SET_MODAL, {
                pinOptionTypeID: selectedTypeID,
            }),
        );
    };

    const showEditModal = set => {
        dispatch(showModal(EDIT_PIN_OPTIONS_SET_MODAL, { set }));
    };

    const enableOptionSet = set => {
        if (!isPosting) dispatch(enablePinOptionSet(set));
    };

    const disableOptionSet = set => {
        if (!isPosting) dispatch(disablePinOptionSet(set));
    };

    const setAsDefault = set => {
        if (!isPosting) dispatch(setOptionSetAsDefault(set, defaultSet));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    return {
        showAddModal,
        showEditModal,
        enableOptionSet,
        disableOptionSet,
        setAsDefault,
    };
};

export default useOptionSetActions;
