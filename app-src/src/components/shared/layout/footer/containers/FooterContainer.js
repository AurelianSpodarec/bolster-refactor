import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCompanyColour } from 'helpers/generic';
import Footer from '../presentational/Footer';

class FooterContainer extends Component {
    render() {
        const { companySettings } = this.props;
        const companyColour = getCompanyColour(companySettings.companyColour);

        return (
            <Footer company={companySettings} companyColour={companyColour} />
        );
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
