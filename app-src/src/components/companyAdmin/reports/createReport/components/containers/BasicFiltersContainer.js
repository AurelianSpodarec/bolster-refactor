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
            formatArrForDropdown,
            services,
            filters: {
                templateID,
                serviceID,
                status,
                fromDateInclusive,
                toDateInclusive,
                reportHistories,
            },
            templates,
        } = this.props;

        const serviceOptions = formatArrForDropdown(services, true);
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
                    />
                </BlockContainer>
            </div>
        );
    }

    componentDidMount = () => {
        const {
            handleChange,
            location: { state: locationState },
            postFilters,
        } = this.props;

        if (locationState && locationState.selectedService) {
            handleChange('serviceID', locationState.selectedService);
        }

        if (locationState && locationState.selectedStatus) {
            handleChange('status', locationState.selectedStatus);
        }

        if (locationState && locationState.selectedStartDate) {
            this.handleDateChange(
                'fromDateInclusive',
                moment(locationState.selectedStartDate).toDate()
            );
        }

        if (locationState && locationState.selectedEndDate) {
            this.handleDateChange(
                'toDateInclusive',
                moment(locationState.selectedEndDate).toDate()
            );
        }

        postFilters();
    };

    handleDateBlur = isStart => {
        isStart ? this.setState({ startBlurred: true }) : this.setState({ endBlurred: true });
    };

    handleDateChange = (name, value) => {
        const { handleChange, postFilters } = this.props;

        handleChange(name, value)
            .then(this.validateDates)
            .then(result => {
                if (result.type !== 'ADD_FIELD_ERROR') {
                    postFilters();
                }
            });
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
            const diff = moment(toDateInclusive).diff(fromDateInclusive, 'days');

            if (diff >= 7 && hierarchyType === HIERARCHY_IDS.ALL_SITES) {
                return addFieldError('fromDateInclusive', 'You must select a date range of 7 days or less.');
            }

            return removeFieldError('fromDateInclusive');
        }
    };

    handleChange = (name, value) => {
        const { handleChange, postFilters, showModal, hideModal, shouldConfirm } = this.props;

        if (shouldConfirm) {
            const handleSubmit = () => {
                hideModal();
                handleChange(name, value).then(postFilters);
            };
            const message = 'Changing this will reset your advanced filters options, continue?';
            showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
        } else {
            handleChange(name, value).then(postFilters);
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
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            fields,
            customFilters: { pins = [], templates = [] },
            filters: { pinIDs = [] },
        },
    },
}) => ({
    shouldConfirm: !isObjEmpty(fields) || pins.length !== pinIDs.length,
    templates,
});

const mapDispatchToProps = {
    hideModal,
    showModal,
};

export default withRouter(
    withUpdateOnChange(connect(mapStateToProps, mapDispatchToProps)(BasicFiltersContainer))
);
