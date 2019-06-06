import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    ADD_DROPDOWN_OPTION,
    SUCCESS_MODAL,
    ERROR_MODAL
} from 'constants/shared/modalTypes';

import DropdownOptionsTable from '../presentational/DropdownOptionsTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { isObjEmpty } from 'helpers/generic';

class DropdownListTableContainer extends Component {
    render() {
        const { isFetching, error, dropdownOptions, title, type } = this.props;

        return (
            <DropdownOptionsTable
                headers={['Name', '']}
                dropdownOptions={dropdownOptions}
                isFetching={isFetching}
                error={error}
                title={title}
                handleAddOptionModal={this.handleAddOptionModal}
                type={type}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            showModal,
            hideModal,
            postError,
            fieldErrors
        } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Dropdown options updated successfully'
            });
        }
        console.log('fieldErrors');
        console.log(fieldErrors);
        if (postError && !prevProps.postError && isObjEmpty(fieldErrors)) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    postError.message ||
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
            postSuccess,
            postError
        }
    },
    shared: {
        fieldErrorsReducer: { fieldErrors }
    }
}) => ({
    postError,
    postSuccess,
    isFetching,
    error,
    dropdownOptions: Object.values(dropdownOptions) || [],
    fieldErrors
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
