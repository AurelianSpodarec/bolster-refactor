import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';

import ManufacturerTable from '../presentational/ManufacturerTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { isObjEmpty } from 'helpers/generic';

class ManufacturerTableContainer extends Component {
    render() {
        const { isFetching, error, manufacturers, title, type } = this.props;
        const dummyManufacturers = [{ name: 'Brush Electric', id: 1 }];

        return (
            <ManufacturerTable
                headers={['Name', '']}
                // manufacturers={manufacturers}
                manufacturers={dummyManufacturers}
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
                message: 'Manufacturers updated successfully',
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

    handleAddManufacturerModal = () => {
        const { showModal, type } = this.props;
        // showModal(ADD_MANUFACTURER, { type });
        // TODO MODAL FOR ADD MANUFACTURER AND ASSOCIATED ACTIONS AND REDUCERS
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            manufacturersReducer: { manufacturers, isFetching, error, postSuccess, postError },
        },
        shared: {
            fieldErrorsReducer: { fieldErrors },
        },
    },
    ownProps,
) => ({
    postError,
    postSuccess,
    isFetching,
    error,
    manufacturers: manufacturers[ownProps.type] ? Object.values(manufacturers[ownProps.type]) : [],
    fieldErrors,
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerTableContainer);
