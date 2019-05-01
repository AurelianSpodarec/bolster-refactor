import React, { Component } from 'react';
import { connect } from 'react-redux';
import DynamicLabelField from '../presentational/DynamicLabelField';

class DynamicLabelFieldContainer extends Component {
    render() {
        return <DynamicLabelField />;
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DynamicLabelFieldContainer);
