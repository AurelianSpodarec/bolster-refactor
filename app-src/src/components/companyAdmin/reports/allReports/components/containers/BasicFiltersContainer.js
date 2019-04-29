import React, { Component } from 'react';
import {
    PIN_STATUS_TYPES,
    NUMBER_OF_HISTORIES
} from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions, enumFormat } from 'helpers/generic';

import withUpdateOnChange from '../hocs/withUpdateOnChange';
import BasicFilters from '../presentational/BasicFilters';

class BasicFiltersContainer extends Component {
    render() {
        const {
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
        const historyNumsOptions = enumFormat(NUMBER_OF_HISTORIES);

        return (
            <BasicFilters
                handleChange={this.handleChange}
                handleDateChange={this.handleDateChange}
                handleHistoryNumChange={this.handleHistoriesChange}
                serviceOptions={Object.values(serviceOptions)}
                selectedService={serviceOptions[serviceID]}
                statusOptions={Object.values(statusOptions)}
                selectedStatus={statusOptions[statusID]}
                startDate={startDate}
                endDate={endDate}
                historyNumsOptions={historyNumsOptions}
                numberOfHistoriesID={numberOfHistoriesID}
            />
        );
    }

    handleDateChange = (name, value) => {
        const { handleChange, postFilters } = this.props;
        handleChange(name, value).then(postFilters);
    };

    handleHistoriesChange = (name, value) => {
        const { handleChange, postFilters } = this.props;
        handleChange(name, value).then(postFilters);
    };

    handleChange = ({ target: { value, name } }) => {
        const { handleChange, postFilters } = this.props;

        handleChange(name, value).then(postFilters);
    };
}

export default withUpdateOnChange(BasicFiltersContainer);
