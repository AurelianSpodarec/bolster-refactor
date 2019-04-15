import React, { Component } from 'react';
import { connect } from 'react-redux';

import SuperAdminInvoices from '../presentational/SuperAdminInvoices';

class SuperAdminInvoicesContainer extends Component {
    render() {
        return <SuperAdminInvoices />;
    }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => ({});

export default connect()(SuperAdminInvoicesContainer);
