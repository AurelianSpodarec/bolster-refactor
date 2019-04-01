import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleCompany from '../presentational/SingleCompany';
class SingleCompanyContainer extends Component {
    render() {
        return <SingleCompany />;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleCompanyContainer);
