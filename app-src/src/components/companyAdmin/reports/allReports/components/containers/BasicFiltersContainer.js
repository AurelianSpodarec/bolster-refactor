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
                statusID,
                startDate,
                endDate,
                numberOfHistoriesID
            }
        } = this.props;

        const serviceOptions = formatArrForDropdown(services, true);
        const statusOptions = convertEnumToDropdownOptions(PIN_STATUS_TYPES);
        const historyNumsOptions = convertEnumToDropdownOptions(
            NUMBER_OF_HISTORIES
        );

        return (
            <BasicFilters
                dateError={fieldErrors['startDate']}
                handleChange={this.handleChange}
                handleDateChange={this.handleDateChange}
                serviceOptions={Object.values(serviceOptions)}
                selectedService={serviceOptions[serviceID]}
                statusOptions={Object.values(statusOptions)}
                selectedStatus={statusOptions[statusID]}
                startDate={startDate}
                endDate={endDate}
                historyNumsOptions={Object.values(historyNumsOptions)}
                selectedHistoryNum={historyNumsOptions[numberOfHistoriesID]}
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
            filters: { startDate, endDate },
            addFieldError,
            removeFieldError
        } = this.props;

        if ((startDate && !endDate) || (!startDate && endDate)) {
            return addFieldError('startDate', 'Both dates must be filled.');
        } else if (startDate > endDate) {
            return addFieldError(
                'startDate',
                'Start date must be before end date.'
            );
        } else {
            return removeFieldError('startDate');
        }
    };

    handleChange = ({ target: { value, name } }) => {
        const { handleChange, postFilters } = this.props;

        handleChange(name, value).then(postFilters);
    };
}

export default withUpdateOnChange(BasicFiltersContainer);
