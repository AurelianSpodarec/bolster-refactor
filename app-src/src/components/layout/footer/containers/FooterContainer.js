import React, { Component } from 'react';
import { connect } from 'react-redux';

import Footer from '../presentational/Footer';

class FooterContainer extends Component {
    render() {
        const { company } = this.props;

        return <Footer company={company} />;
    }
}

export default connect(state => state.companyReducers.company)(FooterContainer);
