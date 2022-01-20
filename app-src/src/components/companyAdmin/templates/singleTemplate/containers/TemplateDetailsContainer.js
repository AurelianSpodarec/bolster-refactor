import React from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import TemplateDetails from '../presentational/TemplateDetails';

const TemplateDetailsContainer = ({ template, isFetching, error, service }) => {
    return (
        <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(template)}>
            <TemplateDetails template={template} serviceIcon={service?.pinImageS3Key} />
        </BlockContainer>
    );
};

const mapStateToProps = (
    {
        companyAdmin: {
            templatesReducer: { isFetching, error, templates },
            servicesReducer: { services },
        },
    },
    ownProps,
) => ({
    isFetching,
    error,
    template: templates[ownProps.templateID],
    service: services[templates[ownProps.templateID]?.serviceID],
});

export default connect(mapStateToProps)(TemplateDetailsContainer);
