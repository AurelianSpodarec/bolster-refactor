import React, { Component } from 'react';
import { connect } from 'react-redux';

import TemplateSectionList from '../presentational/TemplateSectionList';
class TemplateSectionListContainer extends Component {
    render() {
        return <TemplateSectionList sections={this.props.sections} />;
    }
}

export default connect(({ templateBuilderReducer }) => ({
    sections: Object.values(templateBuilderReducer.sections)
}))(TemplateSectionListContainer);
