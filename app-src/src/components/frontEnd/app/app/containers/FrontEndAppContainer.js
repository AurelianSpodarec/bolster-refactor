import React, { Component } from 'react';
import { connect } from 'react-redux';

import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import FrontEndApp from '../presentational/FrontEndApp';

class FrontEndAppContainer extends Component {
    render() {
        return <FrontEndApp />;
    }

    componentDidMount() {
        const { selectAdminMenuTab, decodeJWT, fetchHomeData } = this.props;
        selectAdminMenuTab();
        decodeJWT();
        fetchHomeData();
    }
}

const mapDispatchToProps = dispatch => ({
    decodeJWT: () => {
        dispatch(decodeJWT());
    },
    fetchHomeData: () => {
        dispatch(fetchProfile());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(FrontEndAppContainer);
