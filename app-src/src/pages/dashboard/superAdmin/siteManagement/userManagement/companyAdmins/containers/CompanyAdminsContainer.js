import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompanyAdmins from '../presentational/CompanyAdmins';

export class CompanyAdminsContainer extends Component {
    render() {
        return <CompanyAdmins />;
    }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};

export default connect()(CompanyAdminsContainer);
