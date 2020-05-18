import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SUCCESS_MODAL, ERROR_MODAL, ADMIN_ADD_MANUFACTURER } from 'constants/shared/modalTypes';

import ManufacturerTable from '../presentational/ManufacturerTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { isObjEmpty } from 'helpers/generic';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

class ManufacturerTableContainer extends Component {
    render() {
        const { isFetching, error, manufacturers, title, type } = this.props;

        return (
            <ManufacturerTable
                headers={['Name', '']}
                manufacturers={manufacturers}
                isFetching={isFetching}
                error={error}
                title={title}
                handleAddManufacturerModal={this.handleAddManufacturerModal}
                type={type}
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
        showModal(ADMIN_ADD_MANUFACTURER, { type });
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

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerTableContainer);
