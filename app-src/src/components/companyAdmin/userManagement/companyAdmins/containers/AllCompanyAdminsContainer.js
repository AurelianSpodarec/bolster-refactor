import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AllCompanyAdmins from '../presentational/AllCompanyAdmins';

export class AllCompanyAdminsContainer extends Component {
    static propTypes = {
        prop: PropTypes
    };

    render() {
        return <AllCompanyAdmins />;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllCompanyAdminsContainer);
