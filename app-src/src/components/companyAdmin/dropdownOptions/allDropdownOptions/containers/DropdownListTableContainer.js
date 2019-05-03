import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ADD_DROPDOWN_OPTION } from 'constants/shared/modalTypes';

import DropdownOptionsTable from '../presentational/DropdownOptionsTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class DropdownListTableContainer extends Component {
    render() {
        const { isFetching, error, dropdownOptions, title } = this.props;

        return (
            <DropdownOptionsTable
                headers={['Name', '']}
                dropdownOptions={dropdownOptions}
                isFetching={isFetching}
                error={error}
                title={title}
                handleAddOptionModal={this.handleAddOptionModal}
            />
        );
    }

    handleAddOptionModal = () => {
        const { showModal, type } = this.props;
        showModal(ADD_DROPDOWN_OPTION, { type });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        dropdownOptionsReducer: { dropdownOptions, isFetching, error }
    }
}) => ({
    dropdownOptions: Object.values(dropdownOptions) || [],
    isFetching,
    error
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DropdownListTableContainer);
