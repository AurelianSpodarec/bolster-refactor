import React from 'react';
import { connect } from 'react-redux';
import TemplatesTable from '../presentational/TemplatesTable';

const TemplatesTableContainer = ({
    templates,
    isFetching,
    error,
    services
}) => {
    const headers = ['a', 'b', 'c'];
    const templateData = templates.map(template => ({
        ...template,
        serviceName: services[template.serviceID].name
    }));
    return (
        <TemplatesTable
            headers={headers}
            templates={templateData}
            isFetching={isFetching}
            error={error}
        />
    );
};

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
