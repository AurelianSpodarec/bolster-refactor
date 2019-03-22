import React, { Component } from 'react';
import { connect } from 'react-redux';
import TemplateBuilder from '../presentational/TemplateBuilder';

class TemplateBuilderContainer extends Component {
    render() {
        return <TemplateBuilder />;
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateBuilderContainer);
