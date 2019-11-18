import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SectionList from '../presentational/SectionList';
class SectionListContainer extends Component {
    render() {
        const { sections } = this.props;
        return <SectionList sections={sections} />;
    }
}

const mapStateToProps = (
    {
        superAdmin: {
            templateSectionsReducer: { sections }
        }
    },
    { match: { params } }
) => ({
    sections: Object.values(sections)
        .filter(section => section.templateUUID === params.uuid)
        .sort((a, b) => a.sort - b.sort)
});


const ComponentWithConnect = connect(
    mapStateToProps,
)(SectionListContainer);

export default withRouter(ComponentWithConnect);
