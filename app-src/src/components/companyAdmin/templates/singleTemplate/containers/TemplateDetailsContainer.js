import React from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import TemplateDetails from '../presentational/TemplateDetails';

const TemplateDetailsContainer = ({ template, isFetching, error }) => (
    <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(template)}>
        <TemplateDetails template={template} />
    </BlockContainer>
);

const mapStateToProps = (
    {
        companyAdmin: {
            templatesReducer: { isFetching, error, templates },
        },
    },
    ownProps,
) => ({
    isFetching,
    error,
    template: templates[ownProps.templateID],
});

export default connect(mapStateToProps)(TemplateDetailsContainer);
