import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SUCCESS_MODAL, ERROR_MODAL, COMPANY_ADD_MANUFACTURER } from 'constants/shared/modalTypes';

import ManufacturerTable from '../presentational/ManufacturerTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { isObjEmpty } from 'helpers/generic';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';
import reorderManufacturers from 'actions/companyAdmin/dropdownOptions/sync/reorderManufacturers';

class ManufacturerTableContainer extends Component {
    render() {
        const { isFetching, error, title, type, isSorting, manufacturers } = this.props;

        return (
            <ManufacturerTable
                headers={['Name', '']}
                manufacturers={manufacturers}
                isFetching={isFetching}
                error={error}
                title={title}
                handleAddManufacturerModal={this.handleAddManufacturerModal}
                type={type}
                moveItem={this.moveItem}
                isSorting={isSorting}
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

    moveItem = (overindex, fromIndex) => {
        const { manufacturers, reorderManufacturers, type } = this.props;
        const items = [...manufacturers].sort((a, b) => a.sort - b.sort);
        const [item] = items.splice(fromIndex, 1);
        items.splice(overindex, 0, item);
        const sorted = items.map((x, i) => ({ ...x, sort: i + 1, manufacturerID: x.ID }));
        reorderManufacturers(sorted, type);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            manufacturersReducer: { manufacturers, isFetching, error, postSuccess, postError },
        },
        shared: {
            fieldErrorsReducer: { fieldErrors },
            sortReducer: { isSorting },
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
            ? Object.values(manufacturers[pinOptionKey]).sort((a, b) => a.sort - b.sort)
            : [],
        fieldErrors,
        isSorting,
    };
};

const mapDispatchToProps = { showModal, reorderManufacturers };

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerTableContainer);
