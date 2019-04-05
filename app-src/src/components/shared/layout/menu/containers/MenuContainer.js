import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenusWrapper from '../presentational/MenusWrapper';

class MenuContainer extends Component {
    render() {
        const { showSuperAdmin } = this.props;

        return <MenusWrapper showSuperAdmin={showSuperAdmin} />;
    }
}

const mapStateToProps = ({ shared: { decodeJWTReducer } }) => ({
    showSuperAdmin: decodeJWTReducer.jwtData.IsSuperAdmin
});

export default connect(mapStateToProps)(MenuContainer);
