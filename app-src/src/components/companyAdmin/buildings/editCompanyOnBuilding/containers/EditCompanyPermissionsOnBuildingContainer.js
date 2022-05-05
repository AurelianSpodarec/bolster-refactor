import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditCompanyPermissionsOnBuilding from '../presentational/EditCompanyPermissionsOnBuilding';
import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchPermissionsForCompanyPermission from 'actions/companyAdmin/companiesPermissions/async/fetchPermissionsForCompanyPermission';

class EditCompanyPermissionsOnBuildingContainer extends Component {
    render() {
        const { building } = this.props;

        return <EditCompanyPermissionsOnBuilding buildingName={building.name || ''} />;
    }

    componentDidMount = () => {
        const { buildingID, fetchSingleBuilding, fetchPermissionsForCompanyPermission, companyID } =
            this.props;
        fetchSingleBuilding(buildingID);
        fetchPermissionsForCompanyPermission('building', buildingID, companyID);
    };
}

const mapStateToProps = ({ companyAdmin: { buildingsReducer } }, { match }) => ({
    buildingID: match.params.id,
    building: buildingsReducer.buildings[match.params.id] || {},
    companyID: match.params.companyID,
});

const mapDispatchToProps = { fetchSingleBuilding, fetchPermissionsForCompanyPermission };
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditCompanyPermissionsOnBuildingContainer),
);
