import React, { Component } from 'react';
import { connect } from 'react-redux';

import Footer from '../presentational/Footer';

class FooterContainer extends Component {
    render() {
        const { companySettings } = this.props;

        return <Footer company={companySettings} />;
    }
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { companySettings }
    }
}) => ({
    companySettings
});

export default connect(mapStateToProps)(FooterContainer);
