import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SUCCESS_MODAL, ERROR_MODAL, COMPANY_ADD_MANUFACTURER } from 'constants/shared/modalTypes';

import ManufacturerTable from '../presentational/ManufacturerTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { isObjEmpty } from 'helpers/generic';
import { DROPDOWN_OPTIONS, DEFAULT_PIN_OPTIONS_SORT } from 'constants/companyAdmin/enums';
import reorderManufacturers from 'actions/companyAdmin/dropdownOptions/sync/reorderManufacturers';

class ManufacturerTableContainer extends Component {
    render() {
        const { isFetching, error, title, type, selectedSortValue } = this.props;

        return (
            <ManufacturerTable
                headers={['Name', '']}
                manufacturers={this.getSortedManufacturerOptions()}
                isFetching={isFetching}
                error={error}
                title={title}
                handleAddManufacturerModal={this.handleAddManufacturerModal}
                type={type}
                selectedSortValue={selectedSortValue}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, showModal, hideModal, postError, fieldErrors } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Manufacturers list updated successfully.',
            });
        }
        if (postError && !prevProps.postError && isObjEmpty(fieldErrors)) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    postError.message ||
                    'There was an error processing your request, please try again later.',
            });
        }
    };

    handleAddManufacturerModal = () => {
        const { showModal, type } = this.props;
        showModal(COMPANY_ADD_MANUFACTURER, { type });
    };
    getSortedManufacturerOptions = () => {
        const { manufacturers, selectedSortValue } = this.props;
        const { NAME_ASC, NAME_DESC, DATE_ASC, DATE_DESC } = DEFAULT_PIN_OPTIONS_SORT;

        if (+selectedSortValue === NAME_ASC) {
            return [...manufacturers].sort((a, b) =>
                a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }),
            );
        }

        if (+selectedSortValue === NAME_DESC) {
            return [...manufacturers].sort((a, b) =>
                b.name.localeCompare(a.name, undefined, { numeric: true, sensitivity: 'base' }),
            );
        }

        if (+selectedSortValue === DATE_ASC) {
            return [...manufacturers].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        if (+selectedSortValue === DATE_DESC) {
            return [...manufacturers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return [...manufacturers].sort((a, b) => {
            // todo handle null sort?
            return a.sort - b.sort;
        });
    };

    moveItem = (overindex, fromIndex) => {
        const { manufacturers, reorderManufacturers } = this.props;

        const items = [...manufacturers].sort((a, b) => a.sort - b.sort);
        const [item] = items.splice(fromIndex, 1);
        items.splice(overindex, 0, item);
        const sorted = items.map((x, i) => ({ ...x, sort: i + 1, manufacturerID: x.ID }));
        reorderManufacturers(sorted);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            manufacturersReducer: { manufacturers, isFetching, error, postSuccess, postError },
        },
        shared: {
            fieldErrorsReducer: { fieldErrors },
        },
    },
    ownProps,
) => {
    const pinOptionKey = DROPDOWN_OPTIONS[ownProps.type].reduxKey;
    return {
        postError,
        postSuccess,
        isFetching,
        error,
        manufacturers: manufacturers[pinOptionKey]
            ? Object.values(manufacturers[pinOptionKey])
            : [],
        fieldErrors,
    };
};

const mapDispatchToProps = { showModal, reorderManufacturers };

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerTableContainer);
