import React from 'react';
import { connect } from 'react-redux';
import TemplatesTable from '../presentational/TemplatesTable';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const TemplatesTableContainer = ({ templates, isFetching, error, services }) =>
    isFetching ? (
        <Loading />
    ) : (
        <TemplatesTable
            headers={['Name', 'Service', '']}
            templates={templates.map(({ serviceID, ...template }) => ({
                serviceName: services[serviceID].name,
                ...template
            }))}
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
    services,
    isFetching: fetchingTemplates || fetchingServices,
    error
});

export default connect(mapStateToProps)(TemplatesTableContainer);
