import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ContactPage from 'components/frontEnd/contact/presentational/ContactPage';

export class ContactPageContainer extends Component {
    static propTypes = {
        prop: PropTypes
    };

    render() {
        return <ContactPage />;
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    null,
    null
)(ContactPageContainer);
