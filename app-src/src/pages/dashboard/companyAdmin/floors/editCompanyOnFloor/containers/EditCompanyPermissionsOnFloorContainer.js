import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditCompanyPermissionsOnFloor from '../presentational/EditCompanyPermissionsOnFloor';
import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';
import fetchPermissionsForCompanyPermission from 'actions/companyAdmin/companiesPermissions/async/fetchPermissionsForCompanyPermission';

class EditCompanyPermissionsOnFloorContainer extends Component {
    render() {
        const { floor } = this.props;

        return <EditCompanyPermissionsOnFloor floorName={floor.name || ''} />;
    }

    componentDidMount = () => {
        const { floorID, fetchSingleFloor, fetchPermissionsForCompanyPermission, companyID } =
            this.props;
        fetchSingleFloor(floorID);
        fetchPermissionsForCompanyPermission('floor', floorID, companyID);
    };
}

const mapStateToProps = ({ companyAdmin: { floorsReducer } }, { match }) => ({
    floorID: match.params.id,
    floor: floorsReducer.floors[match.params.id] || {},
    companyID: match.params.companyID,
});

const mapDispatchToProps = { fetchSingleFloor, fetchPermissionsForCompanyPermission };
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditCompanyPermissionsOnFloorContainer),
);
