import React from 'react';
import { connect } from 'react-redux';

import TemplateSectionList from '../presentational/TemplateSectionList';

const TemplateSectionListContainer = ({ sections }) => (
    <TemplateSectionList sections={sections} />
);

export default connect(({ templateSectionsReducer }) => ({
    sections: Object.values(templateSectionsReducer.sections).sort(
        (a, b) => a.sort - b.sort
    )
}))(TemplateSectionListContainer);
