import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCompanyColour } from 'helpers/generic';
import Footer from '../presentational/Footer';
import defaultStyles from 'constants/defaultStyles';

class FooterContainer extends Component {
    render() {
        const { version, isFetching, error, companySettings, companyUserID } = this.props;
        const companyColour = !companyUserID
            ? defaultStyles.colourCode
            : getCompanyColour(companySettings.companyColour);

        return (
            <Footer
                company={companySettings}
                companyColour={companyColour}
                version={version}
                isFetching={isFetching}
                error={error}
                companyUserID={companyUserID}
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
    shared: {
        decodeJWTReducer: {
            jwtData: { companyUserID },
        },
    },
}) => ({
    version,
    isFetching,
    error,
    companySettings,
    companyUserID,
});

export default connect(mapStateToProps)(FooterContainer);
