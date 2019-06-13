import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompaniesList from '../presentational/CompaniesList';

class CompanySelectionContainer extends Component {
    render = () => {
        const { companies } = this.props;

        return (
            <CompaniesList
                companies={companies}
                selectCompany={this.selectCompany}
            />
        );
    };

    selectCompany = companyID => {
        const { history } = this.props;

        localStorage.setItem('selectedCompany', companyID);
        history.push('/client/sites');
    };
}

const mapStateToProps = ({
    client: {
        companiesReducer: { companies }
    }
}) => ({
    companies: Object.values(companies)
});

export default withRouter(connect(mapStateToProps)(CompanySelectionContainer));
