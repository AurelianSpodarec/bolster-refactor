import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeadquartersCompanyListItem from '../presentational/HeadquartersCompanyListItem';
import reissueToken from 'actions/shared/auth/async/reissueToken';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';

class HeadquartersCompanyListItemContainer extends Component {
    render() {
        const { company, impersonatedCompanyID } = this.props;
        return (
            <HeadquartersCompanyListItem
                company={company}
                impersonatedCompanyID={impersonatedCompanyID}
                handleImpersonate={this.handleImpersonate}
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
        }
    }
}) => ({
    impersonatedCompanyID: companyID,
    headquartersCompanyID
});

const mapDispatchToProps = dispatch => ({
    reissueToken: companyID =>
        dispatch(reissueToken(companyID)).then(() => dispatch(decodeJWT()))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeadquartersCompanyListItemContainer);
