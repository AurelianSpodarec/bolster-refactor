import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ADD_DROPDOWN_OPTION, SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';

import DropdownOptionsTable from '../presentational/DropdownOptionsTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { isObjEmpty } from 'helpers/generic';
import { DEFAULT_PIN_OPTIONS_SORT } from 'constants/companyAdmin/enums';

class DropdownListTableContainer extends Component {
    state = {
        selectedSortValue: this.props.defaultDropdownSorting,
    };

    render() {
        const { selectedSortValue } = this.state;
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
                selectedSortValue={selectedSortValue}
                handleSortChange={this.handleSortChange}
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

    handleSortChange = value => {
        this.setState({
            selectedSortValue: value,
        });
    };

    getSortedDropdownOptions = () => {
        const { selectedSortValue } = this.state;
        const { dropdownOptions } = this.props;
        const { NAME_ASC, NAME_DESC, DATE_ASC, DATE_DESC } = DEFAULT_PIN_OPTIONS_SORT;

        if (+selectedSortValue === NAME_ASC) {
            return [...dropdownOptions].sort((a, b) => a.name - b.name);
        }

        if (+selectedSortValue === NAME_DESC) {
            return [...dropdownOptions].sort((a, b) =>
                b.name.localeCompare(a.name, undefined, { numeric: true, sensitivity: 'base' }),
            );
        }

        if (+selectedSortValue === DATE_ASC) {
            return [...dropdownOptions].sort(
                (a, b) => new Date(a.createdOn) - new Date(b.createdOn),
            );
        }

        if (+selectedSortValue === DATE_DESC) {
            return [...dropdownOptions].sort(
                (a, b) => new Date(b.createdOn) - new Date(a.createdOn),
            );
        }

        return [...dropdownOptions].sort((a, b) => a.sort - b.sort);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { defaultDropdownSorting },
        },
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
    defaultDropdownSorting,
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownListTableContainer);
