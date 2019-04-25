import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllHeadquartersCompanies from 'actions/companyAdmin/headquarters/async/fetchAllHeadquartersCompanies';
import HeadquartersCompanies from '../presentational/HeadquartersCompanies';
import reissueToken from 'actions/shared/auth/async/reissueToken';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';

class HeadquartersCompaniesContainer extends Component {
    render = () => (
        <HeadquartersCompanies
            handleCancelImpersonation={this.handleCancelImpersonation}
            isImpersonating={this.props.isImpersonating}
        />
    );
    handleCancelImpersonation = () => {
        const { reissueToken } = this.props;
        reissueToken();
    };
    componentDidMount = () => this.props.fetchAllHeadquartersCompanies();
}

const mapStateToProps = ({
    companyAdmin: {
        headquartersReducer: { companies, postSuccess }
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { companyID, headquartersCompanyID }
        }
    }
}) => ({
    companies,
    isImpersonating:
        companyID &&
        headquartersCompanyID &&
        companyID !== headquartersCompanyID,
    postSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchAllHeadquartersCompanies: () =>
        dispatch(fetchAllHeadquartersCompanies()),
    reissueToken: () => {
        dispatch(reissueToken())
            .then(() => dispatch(decodeJWT()))
            .then(() => dispatch(fetchCompanySettings()));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeadquartersCompaniesContainer);
