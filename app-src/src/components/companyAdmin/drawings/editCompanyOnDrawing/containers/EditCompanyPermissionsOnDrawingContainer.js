import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditCompanyPermissionsOnDrawing from '../presentational/EditCompanyPermissionsOnDrawing';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import fetchPermissionsForCompanyPermission from 'actions/companyAdmin/companiesPermissions/async/fetchPermissionsForCompanyPermission';

class EditCompanyPermissionsOnDrawingContainer extends Component {
    render() {
        const { drawing } = this.props;

        return <EditCompanyPermissionsOnDrawing drawingName={drawing.name || ''} />;
    }

    componentDidMount = () => {
        const {
            drawingID,
            fetchSingleDrawing,
            fetchPermissionsForCompanyPermission,
            companyID,
        } = this.props;
        fetchSingleDrawing(drawingID);
        fetchPermissionsForCompanyPermission('drawing', drawingID, companyID);
    };
}

const mapStateToProps = ({ companyAdmin: { drawingsReducer } }, { match }) => ({
    drawingID: match.params.id,
    drawing: drawingsReducer.drawings[match.params.id] || {},
    companyID: match.params.companyID,
});

const mapDispatchToProps = { fetchSingleDrawing, fetchPermissionsForCompanyPermission };
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditCompanyPermissionsOnDrawingContainer),
);
