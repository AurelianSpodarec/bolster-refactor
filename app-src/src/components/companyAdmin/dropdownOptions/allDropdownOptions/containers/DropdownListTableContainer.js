import React, { Component } from 'react';
import { connect } from 'react-redux';

import reorderDropdownOptions from 'actions/companyAdmin/dropdownOptions/sync/reorderDropdownOptions';
import { ADD_DROPDOWN_OPTION, SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';

import DropdownOptionsTable from '../presentational/DropdownOptionsTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { isObjEmpty } from 'helpers/generic';

class DropdownListTableContainer extends Component {
    render() {
        const { isFetching, error, title, type } = this.props;

        return (
            <DropdownOptionsTable
                headers={['Name', '']}
                dropdownOptions={this.getSortedDropdownOptions()}
                isFetching={isFetching}
                error={error}
                title={title}
                handleAddOptionModal={this.handleAddOptionModal}
                type={type}
                moveItem={this.moveItem}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, showModal, hideModal, postError, fieldErrors } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Dropdown options updated successfully',
            });
        }
        if (postError && !prevProps.postError && isObjEmpty(fieldErrors)) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    postError.message ||
                    '##There was an error processing your request, please try again later.##',
            });
        }
    };

    handleAddOptionModal = () => {
        const { showModal, type } = this.props;
        showModal(ADD_DROPDOWN_OPTION, { type });
    };

    moveItem = (overindex, fromIndex) => {
        const { dropdownOptions, reorderDropdownOptions } = this.props;

        const items = [...dropdownOptions].sort((a, b) => a.sort - b.sort);
        const [item] = items.splice(fromIndex, 1);
        items.splice(overindex, 0, item);
        const sorted = items.map((x, i) => ({ ...x, sort: i + 1 }));
        reorderDropdownOptions(sorted);
    };

    getSortedDropdownOptions = () => {
        const { dropdownOptions } = this.props;
        return [...dropdownOptions].sort((a, b) => a.sort - b.sort);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        dropdownOptionsReducer: { dropdownOptions, isFetching, error, postSuccess, postError },
    },
    shared: {
        fieldErrorsReducer: { fieldErrors },
    },
}) => ({
    postError,
    postSuccess,
    isFetching,
    error,
    dropdownOptions: Object.values(dropdownOptions) || [],
    fieldErrors,
});

const mapDispatchToProps = {
    showModal,
    reorderDropdownOptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownListTableContainer);
