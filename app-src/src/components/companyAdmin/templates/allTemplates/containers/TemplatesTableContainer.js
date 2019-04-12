import React from 'react';
import { connect } from 'react-redux';
import TemplatesTable from '../presentational/TemplatesTable';

const TemplatesTableContainer = ({
    templates,
    isFetching,
    error,
    services
}) => (
    <TemplatesTable
        headers={['Name', 'Service', '']}
        templates={
            !isFetching &&
            templates.map(({ serviceID, ...template }) => ({
                serviceName: services[serviceID].name,
                ...template
            }))
        }
        isFetching={isFetching}
        error={error}
    />
);

const mapStateToProps = ({
    companyAdmin: {
        templatesReducer: { templates, isFetching: fetchingTemplates, error },
        servicesReducer: { services, isFetching: fetchingServices }
    }
}) => ({
    templates: Object.values(templates),
    isFetching: fetchingTemplates || fetchingServices,
    services,
    error
});

export default connect(mapStateToProps)(TemplatesTableContainer);
