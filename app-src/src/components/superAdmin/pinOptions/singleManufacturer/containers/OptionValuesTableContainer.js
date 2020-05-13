import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { SUCCESS_MODAL, ERROR_MODAL, ADMIN_ADD_OPTION_VALUE } from 'constants/shared/modalTypes';

import OptionValuesTable from '../presentational/OptionValuesTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { isObjEmpty } from 'helpers/generic';
import { DROPDOWN_OPTIONS, DROPDOWN_OPTION_LOOKUP } from 'constants/companyAdmin/enums';

class OptionValuesTableContainer extends Component {
    render() {
        const { isFetching, error, optionValues, title, type } = this.props;

        return (
            <OptionValuesTable
                headers={['Name', '']}
                optionValues={optionValues}
                isFetching={isFetching}
                error={error}
                title={title}
                handleAddOptionValueModal={this.handleAddOptionValueModal}
                type={type}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, showModal, hideModal, postError, fieldErrors } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Option values list updated successfully.',
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

    handleAddOptionValueModal = () => {
        const { showModal, manufacturer, services } = this.props;

        showModal(ADMIN_ADD_OPTION_VALUE, { manufacturer, services });
        // todo create redux and modal for adding an option value
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            manufacturersReducer: {
                manufacturers,
                isFetching: isFetchingManufacturers,
                error: manufacturersError,
            },
            manufacturersOptionValuesReducer: {
                manufacturersOptionValues,
                isFetching,
                error,
                postSuccess,
                postError,
            },
            adminServicesReducer: {
                adminServices,
                isFetching: isFetchingServices,
                error: servicesError,
            },
        },
        shared: {
            fieldErrorsReducer: { fieldErrors },
        },
    },
    {
        match: {
            params: { id, type },
        },
    },
) => {
    const pinOptionKey = DROPDOWN_OPTIONS[DROPDOWN_OPTION_LOOKUP[type]].reduxKey;

    return {
        manufacturer: manufacturers[pinOptionKey][id],
        manufacturerID: id,
        isFetching: isFetching || isFetchingServices || isFetchingManufacturers,
        error: error || servicesError || manufacturersError,
        optionValues: manufacturersOptionValues[id]
            ? Object.values(manufacturersOptionValues[id])
            : [],
        services: adminServices,
        fieldErrors,
        postSuccess,
        postError,
    };
};

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OptionValuesTableContainer));
