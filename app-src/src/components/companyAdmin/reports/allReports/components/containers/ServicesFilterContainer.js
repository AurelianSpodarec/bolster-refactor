import React, { Component } from 'react';
import { connect } from 'react-redux';

import { convertArrToObj } from 'helpers/generic';
import withUpdateOnChange from '../hocs/withUpdateOnChange';
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
        const { updateReportFilter, postFilters} = this.props;

        updateReportFilter(name, value).then(postFilters);
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
       return dispatch(updateReportFilter(name, val));
    }
});

const WithRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServicesFilterContainer);


export default withUpdateOnChange(WithRedux);