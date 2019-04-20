import React, { Component } from 'react';
import { connect } from 'react-redux';

import { convertArrToObj, convertEnumToDropdownOptions } from 'helpers/generic';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import ServicesFilters from '../presentational/ServicesFilters';

class ServicesFilterContainer extends Component {
    render() {
        const {
            filters: { serviceID }
        } = this.props;

        const serviceOptions = this._getServicesOptions();

        return (
            <ServicesFilters
                serviceOptions={Object.values(serviceOptions)}
                selectedService={serviceOptions[serviceID]}
                handleChange={this.handleChange}
            />
        );
    }

    handleChange = ({ target: { value, name } }) => {
        const { updateReportFilter } = this.props;

        updateReportFilter(name, value);
    };

    _getServicesOptions = () => {
        const { services } = this.props;

        const options = services.map(({ id, name }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters },
        servicesReducer: { services }
    }
}) => {
    return {
        filters,
        services: Object.values(services)
    };
};

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, val) => {
        dispatch(updateReportFilter(name, val));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServicesFilterContainer);
