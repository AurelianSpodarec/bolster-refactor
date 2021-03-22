import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSelectedCompanyForClient, isEmpty, getBolsterColour } from 'helpers/generic';
import Footer from '../presentational/Footer';

class FooterContainer extends Component {
    render() {
        const { selectedCompany, isCompanyAdmin } = this.props;

        let companyColour = getBolsterColour();

        if (!isEmpty(selectedCompany)) {
            if (selectedCompany.colourCode) companyColour = selectedCompany.colourCode;
        }

        return (
            <Footer
                companyColour={companyColour}
                company={selectedCompany}
                isCompanySelected={!isEmpty(selectedCompany)}
                isCompanyAdmin={isCompanyAdmin}
            />
        );
    }
}

const mapStateToProps = ({
    client: {
        companiesReducer: { companies },
    },
    shared: {
        decodeJWTReducer: { jwtData },
    },
}) => {
    const selectedCompanyID = getSelectedCompanyForClient();

    return {
        selectedCompany: companies[selectedCompanyID] || {},
        isCompanyAdmin: jwtData.isCompanyAdmin,
    };
};

export default connect(mapStateToProps)(FooterContainer);
