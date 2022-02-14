import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ADMIN_EDIT_OPTION_VALUE, CONFIRM_DELETE } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import OptionValuesListItem from '../presentational/OptionValuesListItem';
import { selectIsMobile } from '../../../../../selectors/shared/mobile';
import { selectManufacturerOptionValueDeleteSuccess } from '../../../../../selectors/superAdmin/manufacturerOptionValues';
import { usePrevious } from '../../../../../helpers/hooks';
import deleteManufacturerOptionValue from '../../../../../actions/superAdmin/manufacturers/async/deleteManufacturerOptionValue';

const OptionValuesListItemContainer = ({ optionValue, colCount, headers, services }) => {
    const onMobile = useSelector(selectIsMobile);
    const deleteSuccess = useSelector(selectManufacturerOptionValueDeleteSuccess);
    const prevDeleteSuccess = usePrevious(deleteSuccess);
    const dispatch = useDispatch();

    const { serviceIDs } = optionValue;
    const selectedServiceNames = services
        .filter(service => serviceIDs === null || serviceIDs.includes(service.id))
        .map(service => service.name)
        .join(', ');

    useEffect(() => {
        if (deleteSuccess && !prevDeleteSuccess) {
            dispatch(hideModal());
        }
    }, [deleteSuccess, prevDeleteSuccess, dispatch]);

    return (
        <OptionValuesListItem
            optionValue={optionValue}
            colCount={colCount}
            handleEditOptionValueModal={handleEditOptionValueModal}
            handleDeleteOptionValueModal={handleDeleteOptionValueModal}
            headers={headers}
            onMobile={onMobile}
            selectedServiceNames={selectedServiceNames}
        />
    );

    function handleDeleteOptionValueModal(optionValue) {
        const handleDelete = () => {
            dispatch(deleteManufacturerOptionValue(optionValue));
        };
        const message = 'Are you sure you want to delete this option value?';
        dispatch(showModal(CONFIRM_DELETE, { message, handleDelete, hideModal }));
    }

    function handleEditOptionValueModal(optionValue) {
        dispatch(showModal(ADMIN_EDIT_OPTION_VALUE, { optionValue, services }));
    }
};

export default OptionValuesListItemContainer;
