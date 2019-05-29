import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RequestDemoForm from '../presentational/RequestDemoForm';

export class RequestDemoFormContainer extends Component {
    static propTypes = {
        prop: PropTypes
    };

    render() {
        return <RequestDemoForm />;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    null,
    null
)(RequestDemoFormContainer);
