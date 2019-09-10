import React from 'react';
import { connect } from 'react-redux';
import TemplatesTable from '../presentational/TemplatesTable';

const TemplatesTableContainer = ({ templates, isFetching, error, services, onMobile }) => (
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
        onMobile={onMobile}
    />
);

const mapStateToProps = ({
    companyAdmin: {
        templatesReducer: { templates, isFetching: fetchingTemplates, error },
        servicesReducer: { services, isFetching: fetchingServices }
    },
    shared: {
        mobileReducer: { onMobile }
    }
}) => ({
    templates: Object.values(templates).filter(({ isDeleted }) => !isDeleted),
    isFetching: fetchingTemplates || fetchingServices,
    services,
    error,
    onMobile
});

export default connect(mapStateToProps)(TemplatesTableContainer);
