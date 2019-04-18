import React, { Component } from 'react';
import { connect } from 'react-redux';
import PinFiltersForm from '../presentational/PinFiltersForm';

export class PinFiltersFormContainer extends Component {
    render() {
        return <PinFiltersForm />;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PinFiltersFormContainer);
