import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ContactPage from '../presentational/ContactPage';

export class ContactPageContainer extends Component {
    static propTypes = {
        prop: PropTypes
    };

    render() {
        return <ContactPage />;
    }
}

export default connect()(ContactPageContainer);
