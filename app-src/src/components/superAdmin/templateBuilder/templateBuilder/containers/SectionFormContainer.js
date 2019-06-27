import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PreviewSectionListContainer from '../presentational/PreviewSectionListContainer';

let PreviewSectionListContainerContainer = ({ sections }) => (
    <PreviewSectionListContainer sections={sections} />
);

const mapStateToProps = (
    {
        superAdmin: {
            templateSectionsReducer: { sections }
        }
    },
    {
        match: {
            params: { uuid }
        }
    }
) => ({
    temmplateUUID: uuid,
    sections: Object.values(sections)
        .filter(section => section.templateUUID === uuid)
        .sort((a, b) => a.sort - b.sort)
});

const WithConnect = connect(
    mapStateToProps,
    null
)(PreviewSectionListContainerContainer);

export default withRouter(WithConnect);
