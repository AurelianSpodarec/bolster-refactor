import React, { Component } from 'react';
import { connect } from 'react-redux';

import Footer from '../presentational/Footer';

class FooterContainer extends Component {
    render() {
        const { props } = this;

        return <Footer company={props.company} />;
    }
}

export default connect(state => state.companyReducers.company)(FooterContainer);
