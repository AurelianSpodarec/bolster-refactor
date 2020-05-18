import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ADMIN_EDIT_OPTION_VALUE } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import OptionValuesListItem from '../presentational/OptionValuesListItem';

class OptionValuesListItemContainer extends Component {
    render() {
        const { optionValue, colCount, headers, onMobile, services } = this.props;

        const selectedServiceNames = services
            .reduce((acc, currService) => {
                if (optionValue.serviceIDs.includes(currService.id)) {
                    acc.push(currService.name);
                }
                return acc;
            }, [])
            .join(', ');

        return (
            <OptionValuesListItem
                optionValue={optionValue}
                colCount={colCount}
                handleEditOptionValueModal={this.handleEditOptionValueModal}
                headers={headers}
                onMobile={onMobile}
                selectedServiceNames={selectedServiceNames}
            />
        );
    }
    handleEditOptionValueModal = optionValue => {
        // const { showModal, services } = this.props;
        // showModal(ADMIN_EDIT_OPTION_VALUE, { optionValue, services });
        // todo company admin edit option value redux and modal
    };

    handleToggleEnable = () => {
        // todo company admin toggle enable disable option value redux and modal
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
});

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
