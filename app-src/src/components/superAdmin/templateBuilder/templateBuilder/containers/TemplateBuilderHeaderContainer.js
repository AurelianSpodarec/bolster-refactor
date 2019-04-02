import React from 'react';
import { connect } from 'react-router-dom';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const TemplateBuilderHeaderContainer = () => null;

export default connect(
    ({ templatesReducer: { templates } }, { match: { params } }) => ({})
)(TemplateBuilderHeaderContainer);
