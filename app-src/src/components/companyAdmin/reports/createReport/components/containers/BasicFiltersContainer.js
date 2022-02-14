import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import { PIN_STATUS_TYPES, NUMBER_OF_HISTORIES, HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions, isObjEmpty, convertArrToObj } from 'helpers/generic';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import BasicFilters from '../presentational/BasicFilters';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_SUBMIT } from 'constants/shared/modalTypes';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class BasicFiltersContainer extends Component {
    state = {
        startBlurred: false,
        endBlurred: false,
        showDateErrors: false,
    };

    render() {
        const {
            isDrawingPage,
            fieldErrors,
            fieldError,
            filters: {
                templateID,
                serviceID,
                status,
                fromDateInclusive,
                toDateInclusive,
                reportHistories,
                includeTime,
                startTime,
                endTime,
            },
            templates,
            services,
        } = this.props;

        const serviceOptions = this.formatServicesArrForDropdown(services);
        const statusOptions = convertEnumToDropdownOptions(PIN_STATUS_TYPES);
        const historyNumsOptions = convertEnumToDropdownOptions(NUMBER_OF_HISTORIES);
        const templateOptions = this.formatTemplateArrForDropdown(templates);
        return (
            <div className={`flex-item size-lg-${isDrawingPage ? 12 : 6} size-md-12`}>
                <BlockContainer>
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
                        historyNumsOptions={Object.values(historyNumsOptions)}
                        selectedHistoryNum={historyNumsOptions[reportHistories]}
                        fieldError={fieldError}
                        handleDateBlur={this.handleDateBlur}
                        includeTime={includeTime}
                        startTime={startTime}
                        endTime={endTime}
                    />
                </BlockContainer>
            </div>
        );
    }

    getInitialServices = async () => {
        const { getServiceOptions, getOperativeOptions, getPostBody } = this.props;
        const body = getPostBody();

        await getServiceOptions(body);
        await getOperativeOptions(body);
    };

    componentDidMount = () => {
        this.getInitialServices();

        const {
            handleChange,
            location: { state: locationState },
        } = this.props;

        if (locationState?.selectedService) {
            handleChange('serviceID', locationState.selectedService);
        }

        if (locationState?.selectedStatus) {
            handleChange('status', locationState.selectedStatus);
        }

        if (locationState?.selectedStartDate) {
            this.handleDateChange(
                'fromDateInclusive',
                moment(locationState.selectedStartDate).toDate(),
            );
        }

        if (locationState?.selectedEndDate) {
            this.handleDateChange(
                'toDateInclusive',
                moment(locationState.selectedEndDate).toDate(),
            );
        }
    };

    handleDateBlur = isStart => {
        isStart ? this.setState({ startBlurred: true }) : this.setState({ endBlurred: true });
    };

    handleDateChange = (name, value) => {
        const { handleChange } = this.props;

        handleChange(name, value).then(this.validateDates);
    };

    validateDates = () => {
        const {
            filters: { fromDateInclusive, toDateInclusive, hierarchyType },
            addFieldError,
            removeFieldError,
        } = this.props;

        if (fromDateInclusive && toDateInclusive && fromDateInclusive > toDateInclusive) {
            return addFieldError('fromDateInclusive', 'Start date must be before end date.');
        } else {
            const toDate = toDateInclusive || new Date().setHours(0, 0, 0, 0);

            const diff = moment(toDate).diff(fromDateInclusive, 'days');

            if (
                diff >= 7 &&
                hierarchyType === HIERARCHY_IDS.ALL_SITES &&
                !window.location.href.includes('/drawings')
            ) {
                return addFieldError(
                    'fromDateInclusive',
                    'You must select a date range of 7 days or less.',
                );
            }

            return removeFieldError('fromDateInclusive');
        }
    };

    handleChange = (name, value) => {
        const { handleChange, showModal, hideModal, shouldConfirm } = this.props;

        if (shouldConfirm) {
            const handleSubmit = () => {
                hideModal();
                handleChange(name, value);
            };
            const message = 'Changing this will reset your advanced filters options, continue?';
            showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
        } else {
            if (name === 'includeTime') {
                handleChange('startTime', null);
                handleChange('endTime', null);
            }

            handleChange(name, value);
        }
    };

    formatTemplateArrForDropdown = arr => {
        const options = arr.map(({ id, name, companyName }) => ({
            value: id,
            label: `${name} (${companyName})`,
            text: `${name} (${companyName})`,
        }));

        return convertArrToObj(options, 'value');
    };

    formatServicesArrForDropdown = arr => {
        const options = arr.map(({ id, name }) => ({
            value: id,
            label: `${name}`,
            text: `${name}`,
        }));

        return convertArrToObj(options, 'value');
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            fields,
            customFilters: { pins = [], templates = [], services = [] },
            filters: { pinIDs = [] },
        },
    },
}) => ({
    shouldConfirm: !isObjEmpty(fields) || pins.length !== pinIDs.length,
    templates,
    services,
});

const mapDispatchToProps = {
    hideModal,
    showModal,
};

export default withRouter(
    withUpdateOnChange(connect(mapStateToProps, mapDispatchToProps)(BasicFiltersContainer)),
);
