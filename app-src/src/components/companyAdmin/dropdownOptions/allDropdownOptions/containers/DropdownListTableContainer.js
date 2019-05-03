import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    ADD_DROPDOWN_OPTION,
    SUCCESS_MODAL,
    ERROR_MODAL
} from 'constants/shared/modalTypes';

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

    componentDidUpdate = prevProps => {
        const { postSuccess, showModal, hideModal, error } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Dropdown option added successfully'
            });
        }
        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    '##There was an error processing your request, please try again later.##'
            });
        }
    };

    handleAddOptionModal = () => {
        const { showModal, type } = this.props;
        showModal(ADD_DROPDOWN_OPTION, { type });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        dropdownOptionsReducer: {
            dropdownOptions,
            isFetching,
            error,
            postSuccess
        }
    }
}) => ({
    postSuccess,
    isFetching,
    error,
    dropdownOptions: Object.values(dropdownOptions) || []
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
