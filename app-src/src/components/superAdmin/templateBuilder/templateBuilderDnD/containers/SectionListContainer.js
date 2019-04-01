import React, { Component } from 'react';
import { connect } from 'react-redux';

import SectionList from '../presentational/SectionList';
class SectionListContainer extends Component {
    render() {
        const { sections } = this.props;
        return <SectionList sections={sections} />;
    }
}

const mapStateToProps = ({ templateSectionsReducer }) => ({
    sections: Object.values(templateSectionsReducer.sections).sort(
        (a, b) => a.sort - b.sort
    )
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionListContainer);
