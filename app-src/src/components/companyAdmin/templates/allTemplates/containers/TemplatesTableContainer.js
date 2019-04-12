import React from 'react';
import { connect } from 'react-redux';
import TemplatesTable from '../presentational/TemplatesTable';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const TemplatesTableContainer = ({ templates, isFetching, error, services }) =>
    isFetching ? (
        <TemplatesTable
            headers={['Name', 'Service', '']}
            // adds name of service to template object
            templates={templates.map(({ serviceID, ...template }) => ({
                ...template,
                serviceName: services[serviceID].name
            }))}
            isFetching={isFetching}
            error={error}
        />
    ) : (
        <Loading />
    );

const mapStateToProps = ({
    companyAdmin: {
        templatesReducer: { templates, isFetching: fetchingTemplates, error },
        servicesReducer: { services, isFetching: fetchingServices }
    }
}) => ({
    templates: Object.values(templates),
    services,
    isFetching: fetchingTemplates || fetchingServices,
    error
});

export default connect(mapStateToProps)(TemplatesTableContainer);
