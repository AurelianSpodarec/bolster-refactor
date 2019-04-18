import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PinFilters from '../presentational/PinFilters';

export class PinFiltersContainer extends Component {
    static propTypes = {
        prop: PropTypes
    };

    render() {
        return <PinFilters />;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PinFiltersContainer);
