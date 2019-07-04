import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeadquartersCompanyListItem from '../presentational/HeadquartersCompanyListItem';
import reissueToken from 'actions/shared/auth/async/reissueToken';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';

class HeadquartersCompanyListItemContainer extends Component {
    render() {
        const {
            company,
            impersonatedCompanyID,
            headers,
            onMobile
        } = this.props;
        return (
            <HeadquartersCompanyListItem
                company={company}
                impersonatedCompanyID={impersonatedCompanyID}
                handleImpersonate={this.handleImpersonate}
                headers={headers}
                onMobile={onMobile}
            />
        );
    }

    handleImpersonate = () => {
        const {
            company: { id },
            reissueToken
        } = this.props;
        reissueToken(id);
    };
}

const mapStateToProps = ({
    shared: {
        decodeJWTReducer: {
            jwtData: { companyID, headquartersCompanyID }
        },
        mobileReducer: { onMobile }
    }
}) => ({
    impersonatedCompanyID: companyID,
    headquartersCompanyID,
    onMobile
});

const mapDispatchToProps = dispatch => ({
    reissueToken: companyID =>
        dispatch(reissueToken(companyID))
            .then(() => dispatch(decodeJWT()))
            .then(() => dispatch(fetchCompanySettings()))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeadquartersCompanyListItemContainer);
