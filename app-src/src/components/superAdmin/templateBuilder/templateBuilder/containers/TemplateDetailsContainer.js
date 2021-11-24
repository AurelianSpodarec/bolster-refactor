import React from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import TemplateDetails from '../presentational/TemplateDetails';

const TemplateDetailsContainer = ({ template, isFetching, error, service }) => {
    console.log(service);
    return (
        <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(template)}>
            <TemplateDetails template={template} serviceIcon={service?.pinImageS3Key} />
        </BlockContainer>
    );
};

const mapStateToProps = (
    {
        superAdmin: {
            templatesReducer: { isFetching, error, templates },
            adminServicesReducer: { adminServices },
        },
    },
    ownProps,
) => ({
    isFetching,
    error,
    template: templates[ownProps.templateUUID],
    service: adminServices[templates[ownProps?.templateUUID].serviceID],
});

export default connect(mapStateToProps)(TemplateDetailsContainer);
