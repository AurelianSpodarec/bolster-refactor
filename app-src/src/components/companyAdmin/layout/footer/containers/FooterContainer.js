import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCompanyColour } from 'helpers/generic';
import Footer from '../presentational/Footer';

class FooterContainer extends Component {
    render() {
        const { version, isFetching, error, companySettings } = this.props;
        const companyColour = getCompanyColour(companySettings.companyColour);

        return (
            <Footer
                company={companySettings}
                companyColour={companyColour}
                version={version}
                isFetching={isFetching}
                error={error}
            />
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        appReducer: {
            appVersion: { version },
            isFetching,
            error,
        },
        companySettingsReducer: { companySettings },
    },
}) => ({
    version,
    isFetching,
    error,
    companySettings,
});

export default connect(mapStateToProps)(FooterContainer);
