import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CompanyAdmins from '../presentational/CompanyAdmins';

export class CompanyAdminsContainer extends Component {
    static propTypes = {
        prop: PropTypes
    };

    render() {
        return <CompanyAdmins />;
    }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};

export default connect(null)(CompanyAdminsContainer);
