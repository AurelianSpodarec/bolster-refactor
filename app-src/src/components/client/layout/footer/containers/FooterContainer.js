import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getSelectedCompanyForClient,
    isEmpty,
    getBolsterColour
} from 'helpers/generic';
import Footer from '../presentational/Footer';

class FooterContainer extends Component {
    render() {
        const { selectedCompany } = this.props;

        let companyColour = getBolsterColour();

        if (!isEmpty(selectedCompany)) {
            if (selectedCompany.colourCode)
                companyColour = selectedCompany.colourCode;
        }

        return (
            <Footer
                companyColour={companyColour}
                company={selectedCompany}
                isCompanySelected={!isEmpty(selectedCompany)}
            />
        );
    }
}

const mapStateToProps = ({
    client: {
        companiesReducer: { companies }
    }
}) => {
    const selectedCompanyID = getSelectedCompanyForClient();

    return {
        selectedCompany: companies[selectedCompanyID] || {}
    };
};

export default connect(mapStateToProps)(FooterContainer);
