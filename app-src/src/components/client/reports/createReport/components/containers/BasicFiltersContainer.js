import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import {
    convertEnumToDropdownOptions,
    isObjEmpty,
    getSelectedCompanyForClient
} from 'helpers/generic';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import BasicFilters from '../presentational/BasicFilters';
import resetFilterOptions from 'actions/client/reports/create/sync/clientResetFilterOptions';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_SUBMIT } from 'constants/shared/modalTypes';
import clientFetchAllTemplates from 'actions/client/templates/async/clientFetchAllTemplates';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class BasicFiltersContainer extends Component {
    state = {
        startBlurred: false,
        endBlurred: false,
        showDateErrors: false
    };

    render() {
        const {
            isDrawingPage,
            fieldErrors,
            fieldError,
            formatArrForDropdown,
            services,
            filters: {
                serviceID,
                status,
                fromDateInclusive,
                toDateInclusive,
                templateID
            },
            isFetchingTemplates,
            templates
        } = this.props;

        const serviceOptions = formatArrForDropdown(services, true);
        const statusOptions = convertEnumToDropdownOptions(PIN_STATUS_TYPES);

        const templateOptions = formatArrForDropdown(templates, true);

        return (
            <div
                className={`flex-item size-lg-${
                    isDrawingPage ? '12' : '6'
                } size-md-12`}
            >
                <BlockContainer isFetching={isFetchingTemplates}>
                    <BasicFilters
                        isDrawingPage={isDrawingPage}
                        dateError={fieldErrors['fromDateInclusive']}
                        handleChange={this.handleChange}
                        handleDateChange={this.handleDateChange}
                        serviceOptions={Object.values(serviceOptions)}
                        selectedService={serviceOptions[serviceID]}
                        templateOptions={Object.values(templateOptions)}
                        selectedTemplate={templateOptions[templateID]}
                        statusOptions={Object.values(statusOptions)}
                        selectedStatus={statusOptions[status]}
                        fromDateInclusive={fromDateInclusive}
                        toDateInclusive={toDateInclusive}
                        fieldError={fieldError}
                        handleDateBlur={this.handleDateBlur}
                    />
                </BlockContainer>
            </div>
        );
    }

    componentDidMount = () => {
        const { clientFetchAllTemplates } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();
        clientFetchAllTemplates(selectedCompanyID);
    };

    handleDateBlur = isStart => {
        isStart
            ? this.setState({ startBlurred: true })
            : this.setState({ endBlurred: true });
    };

    handleDateChange = (name, value) => {
        const { handleChange, postFilters } = this.props;

        handleChange(name, value)
            .then(this.validateDates)
            .then(postFilters);
    };

    validateDates = () => {
        const {
            filters: { fromDateInclusive, toDateInclusive },
            addFieldError,
            removeFieldError
        } = this.props;

        if (
            fromDateInclusive &&
            toDateInclusive &&
            fromDateInclusive > toDateInclusive
        ) {
            return addFieldError(
                'fromDateInclusive',
                'Start date must not be after end date.'
            );
        } else {
            return removeFieldError('fromDateInclusive');
        }
    };

    // componentWillUnmount = () => {
    //     this.props.resetFilterOptions();
    // };

    handleChange = (name, value) => {
        const {
            handleChange,
            postFilters,
            showModal,
            hideModal,
            shouldConfirm
        } = this.props;

        if (shouldConfirm) {
            const handleSubmit = () => {
                hideModal();
                handleChange(name, value).then(postFilters);
            };
            const message =
                'Changing this will reset your advanced filters options, continue?';
            showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
        } else {
            handleChange(name, value).then(postFilters);
        }
    };
}

const mapStateToProps = ({
    client: {
        reportsReducer: {
            fields,
            customFilters: { pins = [] },
            filters: { pinIDs = [] }
        },
        templatesReducer: { isFetching: isFetchingTemplates, templates }
    }
}) => ({
    shouldConfirm: !isObjEmpty(fields) || pins.length !== pinIDs.length,
    isFetchingTemplates,
    templates: Object.values(templates)
});

const mapDispatchToProps = {
    resetFilterOptions,
    hideModal,
    showModal,
    clientFetchAllTemplates
};

export default withUpdateOnChange(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BasicFiltersContainer)
);
