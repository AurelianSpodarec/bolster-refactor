import React, { Component } from 'react';
import {
    PIN_STATUS_TYPES,
    NUMBER_OF_HISTORIES
} from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions } from 'helpers/generic';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import BasicFilters from '../presentational/BasicFilters';

class BasicFiltersContainer extends Component {
    state = {
        startBlurred: false,
        endBlurred: false,
        showDateErrors: false
    };

    render() {
        const {
            fieldErrors,
            fieldError,
            formatArrForDropdown,
            services,
            filters: {
                serviceID,
                status,
                fromDateInclusive,
                toDateInclusive,
                reportHistories
            }
        } = this.props;

        const serviceOptions = formatArrForDropdown(services, true);
        const statusOptions = convertEnumToDropdownOptions(PIN_STATUS_TYPES);
        const historyNumsOptions = convertEnumToDropdownOptions(
            NUMBER_OF_HISTORIES
        );

        return (
            <BasicFilters
                dateError={fieldErrors['fromDateInclusive']}
                handleChange={this.handleChange}
                handleDateChange={this.handleDateChange}
                serviceOptions={Object.values(serviceOptions)}
                selectedService={serviceOptions[serviceID]}
                statusOptions={Object.values(statusOptions)}
                selectedStatus={statusOptions[status]}
                fromDateInclusive={fromDateInclusive}
                toDateInclusive={toDateInclusive}
                historyNumsOptions={Object.values(historyNumsOptions)}
                selectedHistoryNum={historyNumsOptions[reportHistories]}
                fieldError={fieldError}
                handleDateBlur={this.handleDateBlur}
            />
        );
    }

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
                'Start date must be before end date.'
            );
        } else {
            return removeFieldError('fromDateInclusive');
        }
    };

    handleChange = (name, value) => {
        const { handleChange, postFilters } = this.props;

        handleChange(name, value).then(postFilters);
    };
}

export default withUpdateOnChange(BasicFiltersContainer);
