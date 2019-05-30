import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ContactPageForm from '../presentational/ContactPageForm';

export class ContactPageFormContainer extends Component {
    static propTypes = {
        prop: PropTypes
    };

    render() {
        return <ContactPageForm />;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    null,
    null
)(ContactPageFormContainer);
