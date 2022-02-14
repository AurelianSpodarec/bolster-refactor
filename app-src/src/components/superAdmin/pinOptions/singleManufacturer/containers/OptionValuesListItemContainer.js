import React from 'react';
import { connect}  from 'react-redux';

import { ADMIN_EDIT_OPTION_VALUE, CONFIRM_DELETE } from 'constants/shared/modalTypes';
import { hideModal, showModal } from 'actions/shared/generic/modals/sync/showModal';

import OptionValuesListItem from '../presentational/OptionValuesListItem';

const OptionValuesListItemContainer = ({ optionValue, colCount, headers, onMobile, services, showModal, hideModal}) => {

        const selectedServiceNames = services
            .reduce((acc, currService) => {
                const { serviceIDs } = optionValue;
                if (serviceIDs === null || serviceIDs.includes(currService.id)) {
                    acc.push(currService.name);
                }
                return acc;
            }, [])
            .join(', ');

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
        const { showModal, hideModal } = this.props;
        const handleDelete = () => {
            // todo
        };
        const message = 'Are you sure you want to delete this option value?';
        showModal(CONFIRM_DELETE, {message, handleDelete, hideModal });
    }

    function handleEditOptionValueModal(optionValue) {
        const { showModal, services } = this.props;
        showModal(ADMIN_EDIT_OPTION_VALUE, { optionValue, services });
    }
};

const mapDispatchToProps = {
    showModal,
    hideModal,
};

export default connect(
    ({
        shared: {
            mobileReducer: { onMobile },
        },
    }) => ({
        onMobile,
    }),
    mapDispatchToProps,
)(OptionValuesListItemContainer);
